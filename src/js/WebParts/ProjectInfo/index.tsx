import * as React from "react";
import RESOURCE_MANAGER from "localization";
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
import ProjectProperty, { ProjectPropertyModel } from "./ProjectProperty";
import IProjectInfoProps, { ProjectInfoDefaultProps } from "./IProjectInfoProps";
import IProjectInfoState from "./IProjectInfoState";
import ProjectInfoRenderMode from "./ProjectInfoRenderMode";
import BaseWebPart from "../@BaseWebPart";

/**
 * Project information
 */
export default class ProjectInfo extends BaseWebPart<IProjectInfoProps, IProjectInfoState> {
    public static displayName = "ProjectInfo";
    public static defaultProps = ProjectInfoDefaultProps;

    /**
     * Constructor
     *
     * @param {IProjectInfoProps} props Props
     */
    constructor(props: IProjectInfoProps) {
        super(props, {
            isLoading: true,
            properties: [],
        });
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        this.fetchData().then(data => {
            this.setState({
                ...data,
                isLoading: false,
            });
        }).catch(error => {
            this.setState({
                isLoading: false,
                error,
            });
        });
    }

    /**
     * Calls _render with props and state to allow for ES6 destruction
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    /**
     * Renders the component
     *
     * @param {IProjectInfoProps} param0 Props
     * @param {IProjectInfoState} param1 State
     */
    public _render({ renderMode, modalOptions, containerClassName, innerClassName, hideChrome }: IProjectInfoProps, { isLoading }: IProjectInfoState): JSX.Element {
        switch (renderMode) {
            case ProjectInfoRenderMode.Normal: {
                return (
                    <div className={containerClassName}>
                        {this.__renderChrome(RESOURCE_MANAGER.getResource("WebPart_ProjectInfo_Title"), this.state.elementToToggle, ProjectInfo.displayName, hideChrome)}
                        {isLoading && <Spinner type={SpinnerType.large} label={RESOURCE_MANAGER.getResource("ProjectInfo_LoadingText")} />}
                        {this.renderInner(this.props, this.state)}
                    </div>
                );
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
                            {isLoading ?
                                (
                                    <Spinner type={SpinnerType.large} label={RESOURCE_MANAGER.getResource("ProjectInfo_LoadingText")} />
                                )
                                :
                                this.renderInner(this.props, this.state)}
                            <DefaultButton
                                hidden={isLoading}
                                href={this.props.webUrl}
                                iconProps={{ iconName: "Home" }}
                                description=""
                                text={RESOURCE_MANAGER.getResource("ProjectInfo_ProjectLinkText")}
                                style={{
                                    marginLeft: 0,
                                    marginTop: 20,
                                    display: "block",
                                }} />
                            <DefaultButton
                                hidden={isLoading}
                                href={`${this.props.webUrl}/SitePages/ProjectStatus.aspx`}
                                iconProps={{ iconName: "BarChart4" }}
                                description=""
                                text={RESOURCE_MANAGER.getResource("ProjectInfo_ProjectStatusLinkText")}
                                style={{
                                    marginLeft: 0,
                                    marginTop: 20,
                                    display: "block",
                                }} />
                        </div>
                    </Modal>);
            }
        }
    }

    /**
     * Render inner
     *
     * @param {IProjectInfoProps} param0 Props
     * @param {IProjectInfoState} param1 State
     */
    private renderInner = ({ innerClassName }: IProjectInfoProps, { isLoading }: IProjectInfoState): JSX.Element => {
        if (isLoading) {
            return null;
        }
        return (
            <div
                className={innerClassName}
                ref={elementToToggle => this.setState({ elementToToggle })}>
                {this.renderProperties(this.props, this.state)}
                {this.renderActionLinks(this.props, this.state)}
            </div>
        );
    }

    /**
     * Render properties
     *
     * @param {IProjectInfoProps} param0 Props
     * @param {IProjectInfoState} param1 State
     */
    private renderProperties({ }: IProjectInfoProps, { properties }: IProjectInfoState): JSX.Element {
        const propertiesToRender = properties.filter(p => !p.empty);
        const hasMissingProps = properties.filter(p => p.required && p.empty).length > 0;
        if (hasMissingProps && this.props.showMissingPropsWarning) {
            return (
                <MessageBar messageBarType={MessageBarType.error}>
                    {RESOURCE_MANAGER.getResource("ProjectInfo_MissingProperties")}
                </MessageBar>
            );
        }
        if (propertiesToRender.length === 0) {
            return (
                <MessageBar>
                    {RESOURCE_MANAGER.getResource("ProjectInfo_NoProperties")}
                </MessageBar>
            );
        }
        return (
            <div>
                {propertiesToRender.map((d, index) => (
                    <ProjectProperty
                        key={index}
                        model={d}
                        labelSize={this.props.labelSize}
                        valueSize={this.props.valueSize} />
                ))}
            </div>
        );
    }

    /**
     * Render action links
     *
     * @param {IProjectInfoProps} param0 Props
     * @param {IProjectInfoState} param1 State
     */
    private renderActionLinks = ({ actionLinks, showActionLinks, actionsClassName }: IProjectInfoProps, { }: IProjectInfoState) => {
        return (
            <div
                hidden={!showActionLinks}
                className={actionsClassName}>
                {actionLinks.map((props, idx) => (
                    <ModalLink key={idx} { ...props } />
                ))}
            </div>
        );
    }

    /**
     * Fetch data. Config, fields and project frontpage data.
     *
     * @param {string} configList Configuration list
     */
    private fetchData = (configList = RESOURCE_MANAGER.getResource("Lists_ProjectConfig_Title")) => new Promise<Partial<IProjectInfoState>>((resolve, reject) => {
        const rootWeb = new Site(this.props.rootSiteUrl).rootWeb;

        const configPromise = rootWeb
            .lists
            .getByTitle(configList)
            .items
            .select("Title", this.props.filterField)
            .get();

        const fieldsPromise = rootWeb
            .contentTypes
            .getById(RESOURCE_MANAGER.getResource("ContentTypes_Prosjektforside_ContentTypeId"))
            .fields
            .select("Title", "Description", "InternalName", "Required", "TypeAsString")
            .get();

        const itemPromise = new Web(this.props.webUrl)
            .lists
            .getByTitle(RESOURCE_MANAGER.getResource("Lists_SitePages_Title"))
            .items
            .getById(this.props.welcomePageId)
            .fieldValuesAsHTML
            .get();

        Promise.all([configPromise, fieldsPromise, itemPromise])
            .then(([config, fields, item]) => {
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
            })
            .catch(reject);
    })
}

export {
    ProjectInfoRenderMode,
    IProjectInfoProps,
    IProjectInfoState,
};
