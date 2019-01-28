import * as React from "react";
import __ from "../../Resources";
import { Site, Web } from "@pnp/sp";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
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
        super(props, { isLoading: true, properties: [] });
    }

    public async componentDidMount() {
        try {
            const data = await this.fetchData();
            this.setState({ ...data, isLoading: false });
        } catch (error) {
            this.setState({ isLoading: false, error });
        }
    }

    public render(): JSX.Element {
        switch (this.props.renderMode) {
            case ProjectInfoRenderMode.Normal: {
                return (
                    <div className={this.props.containerClassName}>
                        {this._renderChrome(this.props.chromeTitle, this.state.elementToToggle, ProjectInfo.displayName, this.props.hideChrome)}
                        {this.state.isLoading && <Spinner type={SpinnerType.large} label={this.props.loadingText} />}
                        {this.renderInner()}
                    </div>
                );
            }
            case ProjectInfoRenderMode.Modal: {
                return (
                    <Modal
                        isOpen={this.props.modalOptions.isOpen}
                        isDarkOverlay={this.props.modalOptions.isDarkOverlay}
                        onDismiss={this.props.modalOptions.onDismiss}
                        containerClassName={`${this.props.containerClassName} pp-modal`}
                        isBlocking={false}>
                        <div style={{ padding: 50 }}>
                            <div
                                className={this.props.modalOptions.headerClassName}
                                style={this.props.modalOptions.headerStyle}
                                hidden={!this.props.modalOptions.title}>
                                <span>{this.props.modalOptions.title}</span>
                            </div>
                            <div hidden={this.state.isLoading} style={{ marginBottom: 20 }}>
                                <DefaultButton
                                    href={this.props.webUrl}
                                    iconProps={{ iconName: "Home" }}
                                    target="_blank"
                                    text={__.getResource("ProjectInfo_ProjectLinkText")}
                                    style={{ marginRight: 10 }} />
                                <DefaultButton
                                    href={`${this.props.webUrl}/SitePages/ProjectStatus.aspx`}
                                    iconProps={{ iconName: "BarChart4" }}
                                    target="_blank"
                                    text={__.getResource("ProjectInfo_ProjectStatusLinkText")} />
                            </div>
                            {this.state.isLoading
                                ? <Spinner type={SpinnerType.large} label={this.props.loadingText} />
                                : this.renderInner()}
                        </div>
                    </Modal>
                );
            }
        }
    }

    /**
     * Render inner
     */
    private renderInner(): JSX.Element {
        if (this.state.isLoading) {
            return null;
        }
        const propertiesToRender = this.state.properties.filter(p => !p.empty);
        const hasMissingProps = this.state.properties.filter(p => p.required && p.empty).length > 0;
        return (
            <div
                className={this.props.innerClassName}
                ref={elementToToggle => this.setState({ elementToToggle })}>
                {this.renderProperties(propertiesToRender, hasMissingProps)}
                {propertiesToRender.length > 0 && !hasMissingProps ? this.renderActionLinks() : <div></div>}
            </div>
        );
    }

    /**
     * Render properties
     */
    private renderProperties(propertiesToRender: ProjectPropertyModel[], hasMissingProps: boolean): JSX.Element {
        if (hasMissingProps && this.props.showMissingPropsWarning) {
            return <MessageBar messageBarType={MessageBarType.error}>
                { String.format(__.getResource("ProjectInfo_MissingProperties"), `../Lists/Properties/NewForm.aspx?Source=${encodeURIComponent(window.location.href)}`) }
            </MessageBar>;
        }
        if (propertiesToRender.length === 0) {
            return <MessageBar>
                { String.format(__.getResource("ProjectInfo_NoProperties"), `../Lists/Properties/NewForm.aspx?Source=${encodeURIComponent(window.location.href)}`) }
            </MessageBar>;
        }
        return (
            <div>
                {propertiesToRender.map((model, key) => {
                    const props = { key, model, labelSize: this.props.labelSize, valueSize: this.props.valueSize };
                    return <ProjectProperty {...props} />;
                })}
            </div>
        );
    }

    /**
     * Render action links
     */
    private renderActionLinks() {
        return (
            <div
                hidden={!this.props.showActionLinks}
                className={this.props.actionsClassName}>
                {this.props.actionLinks.map((props, idx) => (
                    <ModalLink key={idx} {...props} />
                ))}
            </div>
        );
    }

    /**
     * Fetch data. Config, fields and project frontpage data.
     *
     * @param {string} configList Configuration list
     */
    private fetchData(configList = __.getResource("Lists_ProjectConfig_Title")) {
        return new Promise<Partial<IProjectInfoState>>((resolve, reject) => {
            const rootWeb = new Site(this.props.rootSiteUrl).rootWeb;

            const configPromise = rootWeb
                .lists
                .getByTitle(configList)
                .items
                .select("Title", this.props.filterField)
                .usingCaching()
                .get();

            const fieldsPromise = rootWeb
                .contentTypes
                .getById(__.getResource("ContentTypes_Prosjektegenskaper_ContentTypeId"))
                .fields
                .select("Title", "Description", "InternalName", "Required", "TypeAsString")
                .usingCaching()
                .get();

            const itemPromise = new Web(this.props.webUrl)
                .lists
                .getByTitle(__.getResource("Lists_ProjectProperties_Title"))
                .items
                .getById(1)
                .fieldValuesAsHTML
                .usingCaching()
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
        });
    }
}

export {
    ProjectInfoRenderMode,
    IProjectInfoProps,
    IProjectInfoState,
};
