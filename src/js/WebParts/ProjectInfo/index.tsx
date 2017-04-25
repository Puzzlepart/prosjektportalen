import * as React from "react";
import { Site, sp } from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { ModalLink, Icon } from "../@Components";
import { IProjectProp, ProjectProp } from "./ProjectProp";

interface IProjectInfoState {
    properties?: IProjectProp[];
    error: boolean;
    isLoading: boolean;
}

interface IProjectInfoProps {
    showEditLink?: boolean;
    filterField?: string;
}

export default class ProjectInfo extends React.PureComponent<IProjectInfoProps, IProjectInfoState> {
    constructor() {
        super();
        this.state = {
            error: false,
            isLoading: true,
            properties: [],
        };
    }

    public componentDidMount() {
        this.fetchData().then(({ config, item, fields }) => {
            this.setState({ isLoading: false, properties: this.createProjectProperties(config, item, fields) });
        }).catch(_ => {
            this.setState({ isLoading: false, error: true });
        });
    }

    public render() {
        const { showEditLink } = this.props;
        const { isLoading, error, properties } = this.state;
        if (isLoading) {
            return (<Spinner type={SpinnerType.large} label={__("ProjectInfo_LoadingText")} />);
        }
        if (error) {
            return (<div className="ms-metadata">
                <Icon name="Error" color="#000" />  {__("WebPart_FailedMessage")}
            </div>);
        } else {
            return (<div className="pp-projectInfo">
                <ModalLink
                    hidden={showEditLink === false}
                    url="../SitePages/Forms/EditForm.aspx?ID=3"
                    label={__("ProjectInfo_EditProperties")}
                    showLabel={false}
                    id="pp-edit-properties-link-icon"
                    icon="EditMirrored"
                    options={{ HideContentTypeChoice: true, HideWebPartMaintenancePageLink: true, HideRibbon: true, HideFormFields: "GtProjectPhase" }}
                    reloadOnSuccess={true} />
                {this.__renderProperties(properties)}
            </div>);
        }
    }

    /**
     * Render properties
     *
     * @param properties Properties to render
     */
    private __renderProperties(properties: IProjectProp[]): JSX.Element {
        let hasMissingProps = (properties.filter(p => p.required && p.empty).length > 0);
        return (<div>
            {properties.filter(p => !p.empty).map((d, index) => (<ProjectProp key={index} data={d} />))}
            {hasMissingProps && (<div className="ms-metadata" style={{ marginTop: "25px" }}>
                <i className="ms-Icon ms-Icon--Error" aria-hidden="true"></i> {__("ProjectInfo_MissingProperties")}
            </div>)}
        </div>);
    }

    /**
     * Fetch data. Config, fields and project frontpage data.
     *
     * @param configList Configuration list
     */
    private fetchData = (configList = "ProjectConfig") => new Promise((resolve, reject) => {
        const site = new Site(_spPageContextInfo.siteAbsoluteUrl);
        const configPromise = site.rootWeb.lists.getByTitle(configList).items
            .select("Title", "GtPcProjectStatus", "GtPcFrontpage")
            .get();
        const fieldsPromise = site.rootWeb.contentTypes.getById(__("ContentTypes_Prosjektforside_ContentTypeId")).fields
            .select("Title", "Description", "InternalName", "Required", "TypeAsString")
            .filter(`Group eq '${__("SiteFields_Group")}'`)
            .get();
        const itemPromise = sp.web.lists.getById(_spPageContextInfo.pageListId).items.getById(3).fieldValuesAsHTML
            .get();
        Promise.all([configPromise, fieldsPromise, itemPromise]).then(([config, fields, item]) => {
            resolve({
                config: config,
                item: item,
                fields: fields,
            });
        }, reject);
    })

    /**
     * Create project properties based on the fields and config
     *
     * @param config Config items
     * @param item Project item
     * @param fields Fields
     */
    private createProjectProperties(config: any[], item: Object, fields: any[]): IProjectProp[] {
        const { filterField } = this.props;
        let projectProperties: IProjectProp[] = [];
        Object.keys(item).forEach(key => {
            const [field] = fields.filter(({ InternalName }) => InternalName === key);
            const value = item[key];
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
        return projectProperties;
    }
};
