//#region Imports
import * as React from "react";
import RESOURCE_MANAGER from "../../../@localization";
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
                    title={RESOURCE_MANAGER.getResource("NewProjectForm_ShowListContentSettings")}
                    options={this.props.listData}
                    optLabelProp="Label"
                    optDefaultCheckedProp="Default"
                    toggleOptionHandler={this.props.toggleListContentHandler}
                    hidden={this.props.listData.length === 0} />
                <ToggleSection
                    title={RESOURCE_MANAGER.getResource("NewProjectForm_ShowExtensionSettings")}
                    options={this.props.extensions}
                    optLabelProp="Title"
                    optDefaultCheckedProp="IsEnabled"
                    toggleOptionHandler={this.props.toggleExtensionHandler}
                    hidden={this.props.extensions.length === 0} />
            </div>
        );
    }
}

