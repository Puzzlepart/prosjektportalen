import * as React from "react";
import {
    Site,
    Web,
} from "sp-pnp-js";
import {
    Spinner,
    SpinnerType,
    Icon,
} from "office-ui-fabric-react";
import {
    ModalLink,
    ModalLinkIconPosition,
} from "../@Components/ModalLink";
import ChromeTitle from "../@Components/ChromeTitle";
import { IProjectProp, ProjectProp } from "./ProjectProp";

interface IProjectInfoState {
    properties?: IProjectProp[];
    error: boolean;
    isLoading: boolean;
}

interface IProjectInfoProps {
    showEditLink?: boolean;
    showMissingPropsWarning?: boolean;
    filterField?: string;
    labelSize?: string;
    valueSize?: string;
    hideChrome?: boolean;
    webUrl?: string;
    welcomePageId?: number;
}

/**
 * Project information
 */
export default class ProjectInfo extends React.PureComponent<IProjectInfoProps, IProjectInfoState> {
    public static defaultProps: IProjectInfoProps = {
        hideChrome: false,
        webUrl: _spPageContextInfo.webAbsoluteUrl,
        welcomePageId: 3,
    };

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            error: false,
            isLoading: true,
            properties: [],
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        this.fetchData().then(properties => {
            this.setState({
                isLoading: false,
                properties: properties,
            });
        }).catch(_ => {
            this.setState({
                isLoading: false,
                error: true,
            });
        });
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const {
            showEditLink,
            hideChrome,
        } = this.props;

        const {
            isLoading,
            error,
            properties,
         } = this.state;

        if (isLoading) {
            return (<Spinner type={SpinnerType.large} label={__("ProjectInfo_LoadingText")} />);
        }
        if (error) {
            return (<div className="ms-metadata">
                <Icon iconName="Error" style={{ color: "#000000" }} />  {__("WebPart_FailedMessage")}
            </div>);
        } else {
            return (<div className="pp-projectInfo">
                <ChromeTitle
                    title="Om prosjektet"
                    toggleElement={{
                        selector: ".pp-projectInfoInner",
                        animationDelay: 100,
                        animation: "slideToggle",
                        storage: {
                            key: "ProjectInfo",
                            type: "localStorage",
                        },
                    }}
                    hidden={hideChrome}
                />
                <div
                    className="pp-projectInfoInner">
                    {this.__renderProperties(properties)}
                    <div style={{ marginTop: 20 }}>
                        <ModalLink
                            hidden={showEditLink === false}
                            url="../SitePages/Forms/EditForm.aspx?ID=3"
                            label={__("ProjectInfo_EditProperties")}
                            icon={{ iconName: "EditMirrored", position: ModalLinkIconPosition.Left }}
                            options={{
                                HideContentTypeChoice: true,
                                HideWebPartMaintenancePageLink: true,
                                HideRibbon: true,
                                HideFormFields: "GtProjectPhase",
                            }}
                            reloadOnSuccess={true}
                            showLabel={true} />
                    </div>
                </div>
            </div>);
        }
    }

    /**
     * Render properties
     *
     * @param properties Properties to render
     */
    private __renderProperties(properties: IProjectProp[]): JSX.Element {
        const { showMissingPropsWarning, labelSize, valueSize } = this.props;
        let hasMissingProps = (properties.filter(p => p.required && p.empty).length > 0);
        return (<div>
            {properties.filter(p => !p.empty).map((d, index) => (
                <ProjectProp
                    key={index}
                    data={d}
                    labelSize={labelSize}
                    valueSize={valueSize} />
            ))}
            <div hidden={!hasMissingProps || showMissingPropsWarning === false} className="ms-metadata" style={{ marginTop: "25px" }}>
                <i className="ms-Icon ms-Icon--Error" aria-hidden="true"></i> {__("ProjectInfo_MissingProperties")}
            </div>
        </div>);
    }

    /**
     * Fetch data. Config, fields and project frontpage data.
     *
     * @param configList Configuration list
     */
    private fetchData = (configList = "ProjectConfig") => new Promise<IProjectProp[]>((resolve, reject) => {
        const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
        const configPromise = rootWeb
            .lists
            .getByTitle(configList)
            .items
            .select("Title", "GtPcProjectStatus", "GtPcFrontpage", "GtPcPortfolioPage")
            .get();

        const fieldsPromise = rootWeb
            .contentTypes
            .getById(__("ContentTypes_Prosjektforside_ContentTypeId"))
            .fields
            .select("Title", "Description", "InternalName", "Required", "TypeAsString")
            .filter(`Group eq '${__("SiteFields_Group")}'`)
            .get();

        const itemPromise = new Web(this.props.webUrl)
            .lists
            .getByTitle(__("Lists_SitePages_Title"))
            .items
            .getById(this.props.welcomePageId)
            .fieldValuesAsHTML
            .get();

        Promise.all([configPromise, fieldsPromise, itemPromise]).then(([config, fields, item]) => {
            const { filterField } = this.props;
            let projectProperties: IProjectProp[] = [];
            Object.keys(item).forEach(fieldName => {
                const [field] = fields.filter(({ InternalName }) => InternalName === fieldName);
                const value = item[fieldName];
                if (typeof value === "string" && field) {
                    const { Title, InternalName, Description, TypeAsString, Required } = field;
                    const [configItem] = config.filter(c => c.Title === Title);
                    if (configItem && configItem[filterField] === true) {
                        projectProperties.push({
                            internalName: InternalName,
                            displayName: Title,
                            description: Description,
                            value: value,
                            type: TypeAsString,
                            required: Required,
                            empty: value === "",
                        });
                    }
                }
            });
            resolve(projectProperties);
        }, reject);
    })
};
