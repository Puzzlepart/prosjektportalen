//#region Imports
import * as React from "react";
import __ from "../../../Resources";
import INewProjectFormSettingsSectionProps from "./INewProjectFormSettingsSectionProps";
import INewProjectFormSettingsSectionState from "./INewProjectFormSettingsSectionState";
import ToggleSection from "./ToggleSection";
import DropdownSection from "./DropdownSection";
//#endregion

export default class NewProjectFormSettingsSection extends React.Component<INewProjectFormSettingsSectionProps, INewProjectFormSettingsSectionState> {
    public static defaultProps = {
        toggleSectionClassName: "ms-font-l settings-section",
    };

    /**
    * Constructor
    *
    * @param {INewProjectFormSettingsSectionProps} props Props
    * @param {ListProjectType} pt
    */
    constructor(props: INewProjectFormSettingsSectionProps) {
        super(props);
        this.state = {};
        console.log("Amount of List configs: " + this.props.listData.length);
        console.log("Amount of Projecttypes: " + this.props.projectTypes.length);
        console.log("Amount of Extensions: " + this.props.extensions.length);
    }

    public render() {
        return (
            <div className={this.props.className}>
                <ToggleSection
                    title={__.getResource("NewProjectForm_ShowListContentSettings")}
                    options={this.props.listData}
                    optLabelProp="Label"
                    optDefaultCheckedProp="Default"
                    toggleOptionHandler={this.props.onListContentChanged}
                    hidden={this.props.listData.length === 0 || this.props.projectTypes.length !== 0} />
                <DropdownSection
                    title={"Prosjekttype"}
                    placeholder={"Velg et prosjekt"}
                    options={this.props.projectTypes.map(t => ({ key: t.Title, text: t.Title, data: t }))}
                    onChanged={option => this.props.onProjectTypeChanged(option.data)}
                    hidden={this.props.projectTypes.length === 0} />
                <ToggleSection
                    title={__.getResource("NewProjectForm_ShowExtensionSettings")}
                    options={this.props.extensions}
                    optLabelProp="Title"
                    optDefaultCheckedProp="IsEnabled"
                    toggleOptionHandler={this.props.onExtensionsChanged}
                    hidden={this.props.extensions.length === 0} />
            </div>
        );
    }
}

