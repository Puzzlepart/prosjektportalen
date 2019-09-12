//#region Imports
import * as React from "react";
import __ from "../../../Resources";
import INewProjectFormSettingsSectionProps from "./INewProjectFormSettingsSectionProps";
import INewProjectFormSettingsSectionState from "./INewProjectFormSettingsSectionState";
import ToggleSection from "./ToggleSection";
//#endregion

export default class NewProjectFormSettingsSection extends React.Component<INewProjectFormSettingsSectionProps, INewProjectFormSettingsSectionState> {
    public static defaultProps = {
        toggleSectionClassName: "ms-font-l toggle-section",
    };

    /**
    * Constructor
    *
    * @param {INewProjectFormSettingsSectionProps} props Props
    */
    constructor(props: INewProjectFormSettingsSectionProps) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <div className={this.props.className}>
                <ToggleSection
                    title={__.getResource("NewProjectForm_ShowListContentSettings")}
                    options={this.props.listData}
                    optLabelProp="Label"
                    optDefaultCheckedProp="Default"
                    toggleOptionHandler={this.props.toggleListContentHandler}
                    hidden={this.props.listData.length === 0} />
                <ToggleSection
                    title={"Prosjekttype"}
                    options={this.props.listProjectTypes}
                    optLabelProp="Title"
                    optDefaultCheckedProp="ListContentsLookup"
                    toggleOptionHandler={this.props.toggleListProjectTypeContent}
                    hidden={this.props.listProjectTypes.length === 0} />
                <ToggleSection
                    title={__.getResource("NewProjectForm_ShowExtensionSettings")}
                    options={this.props.extensions}
                    optLabelProp="Title"
                    optDefaultCheckedProp="IsEnabled"
                    toggleOptionHandler={this.props.toggleExtensionHandler}
                    hidden={this.props.extensions.length === 0} />
            </div>
        );
    }
}

