import * as React from "react";
import {
    Site,
    Web,
} from "sp-pnp-js";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import Modal from "office-ui-fabric-react/lib/Modal";
import {
    MessageBar,
    MessageBarType,
} from "office-ui-fabric-react/lib/MessageBar";
import { ModalLink } from "../@Components/ModalLink";
import ChromeTitle from "../@Components/ChromeTitle";
import ProjectProperty, { ProjectPropertyModel } from "./ProjectProperty";
import IProjectInfoProps, { ProjectInfoDefaultProps } from "./IProjectInfoProps";
import IProjectInfoState from "./IProjectInfoState";
import ProjectInfoRenderMode from "./ProjectInfoRenderMode";

/**
 * Project information
 */
export default class ProjectInfo extends React.PureComponent<IProjectInfoProps, IProjectInfoState> {
    public static defaultProps = ProjectInfoDefaultProps;
    /**
     * Constructor
     */
    constructor(props: IProjectInfoProps) {
        super(props);
        this.state = {
            isLoading: true,
            properties: [],
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        this.fetchData().then(updatedState => {
            this.setState({
                ...updatedState,
                isLoading: false,
            });
        }).catch(_ => {
            this.setState({
                isLoading: false,
            });
        });
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const { isLoading } = this.state;

        const {
            renderMode,
            modalOptions,
            containerClassName,
         } = this.props;


        switch (renderMode) {
            case ProjectInfoRenderMode.Normal: {
                return (<div className={containerClassName}>
                    {this.renderChrome()}
                    {isLoading && <Spinner type={SpinnerType.large} label={__("ProjectInfo_LoadingText")} />}
                    {this.renderInner()}
                </div>);
            }
            case ProjectInfoRenderMode.Modal: {
                return (
                    <Modal
                        isOpen={modalOptions.isOpen}
                        isDarkOverlay={modalOptions.isDarkOverlay}
                        onDismiss={modalOptions.onDismiss}
                        containerClassName={`${containerClassName} pp-modal`}
                        isBlocking={false}
                    >
                        <div style={{ padding: 50 }}>
                            <div
                                className={modalOptions.headerClassName}
                                style={modalOptions.headerStyle}
                                hidden={!modalOptions.title}>
                                <span>{modalOptions.title}</span>
                            </div>
                            {isLoading && <Spinner type={SpinnerType.large} label={__("ProjectInfo_LoadingText")} />}
                            {this.renderInner()}
                            <DefaultButton
                                hidden={isLoading}
                                href={this.props.webUrl}
                                iconProps={{ iconName: "Home" }}
                                description=""
                                text={__("ProjectInfo_ProjectLinkText")}
                                style={{
                                    marginLeft: 0,
                                    marginTop: 20,
                                }} />
                        </div>
                    </Modal>);
            }
        }
    }

    /**
     * Render chrome
     */
    private renderChrome = (): JSX.Element => {
        return (
            <ChromeTitle
                title={__("WebPart_ProjectInfo_Title")}
                toggleElement={{
                    selector: ".pp-projectInfoInner",
                    animationDelay: 100,
                    animation: "slideToggle",
                    storage: {
                        key: "ProjectInfo",
                        type: "localStorage",
                    },
                }}
                hidden={this.props.hideChrome}
            />
        );
    }

    /**
     * Render inner
     */
    private renderInner = (): JSX.Element => {
        if (this.state.isLoading) {
            return null;
        }
        return (
            <div className="pp-projectInfoInner">
                {this.renderProperties(this.state)}
                {this.renderActionLinks()}
            </div>
        );
    }

    /**
     * Render properties
     *
     * @param properties Properties to render
     */
    private renderProperties({ properties }: IProjectInfoState): JSX.Element {
        const propertiesToRender = properties.filter(p => !p.empty);
        const hasMissingProps = properties.filter(p => p.required && p.empty).length > 0;
        if (hasMissingProps && this.props.showMissingPropsWarning) {
            return (
                <MessageBar messageBarType={MessageBarType.error}>
                    {__("ProjectInfo_MissingProperties")}
                </MessageBar>
            );
        }
        if (propertiesToRender.length === 0) {
            return (
                <MessageBar>
                    {__("ProjectInfo_NoProperties")}
                </MessageBar>
            );
        }
        return (
            <div>
                {propertiesToRender.map((d, index) => (
                    <ProjectProperty
                        key={index}
                        data={d}
                        labelSize={this.props.labelSize}
                        valueSize={this.props.valueSize} />
                ))}
            </div>
        );
    }

    /**
     * Render action links
     */
    private renderActionLinks = () => {
        return (
            <div
                hidden={!this.props.showActionLinks}
                style={{ marginTop: 20 }}>
                {this.props.actionLinks.map((props, idx) => (
                    <ModalLink key={idx} { ...props } />
                ))}
            </div>
        );
    }

    /**
     * Fetch data. Config, fields and project frontpage data.
     *
     * @param configList Configuration list
     */
    private fetchData = (configList = "ProjectConfig") => new Promise<Partial<IProjectInfoState>>((resolve, reject) => {
        const rootWeb = new Site(this.props.rootSiteUrl).rootWeb;
        const configPromise = rootWeb
            .lists
            .getByTitle(configList)
            .items
            .select("Title", this.props.filterField)
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
            let itemFieldNames = Object.keys(item);
            const properties = itemFieldNames
                .filter(fieldName => {
                    /**
                     * Checking if the field exist
                     */
                    const [field] = fields.filter(({ InternalName }) => InternalName === fieldName);
                    if (!field) {
                        return false;
                    }

                    /**
                     * Checking configuration
                     */
                    const [configItem] = config.filter(c => c.Title === field.Title);
                    if (!configItem) {
                        return false;
                    }
                    const shouldBeShown = configItem[this.props.filterField] === true;

                    /**
                     * Checking if the value is a string
                     */
                    const valueIsString = typeof item[fieldName] === "string";
                    return (valueIsString && shouldBeShown);
                })
                .map(fieldName => ({
                    field: fields.filter(({ InternalName }) => InternalName === fieldName)[0],
                    value: item[fieldName],
                }))
                .map(({ field, value }) => new ProjectPropertyModel(field, value));
            resolve({
                properties: properties,
            });
        }, reject);
    })
};

export { ProjectInfoRenderMode };
