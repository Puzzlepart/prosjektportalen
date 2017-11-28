//#region Imports
import * as React from "react";
import RESOURCE_MANAGER from "../../@localization";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import ListConfig from "../../Provision/Data/Config/ListConfig";
import Extension from "../../Provision/Extensions/Extension";
//#endregion

export interface INewProjectFormSettingsSectionProps {
    className: string;
    listData: { [key: string]: ListConfig };
    extensions: Extension[];
    toggleListContentHandler: (key: string, checked: boolean) => void;
    toggleExtensionHandler: (key: string, checked: boolean, extension: Extension) => void;
}

export interface INewProjectFormSettingsSectionState {
    showListContentSettings: boolean;
    showExtensionSettings: boolean;
}

export default class NewProjectFormSettingsSection extends React.Component<INewProjectFormSettingsSectionProps, INewProjectFormSettingsSectionState> {
    /**
    * Constructor
    *
    * @param {INewProjectFormSettingsSectionProps} props Props
    */
    constructor(props: INewProjectFormSettingsSectionProps) {
        super(props);
        this.state = {
            showListContentSettings: false,
            showExtensionSettings: false,
        };
    }

    public render() {
        return (
            <div className={this.props.className}>
                <div onClick={e => this.setState({ showListContentSettings: !this.state.showListContentSettings })} className="ms-font-l toggle-section">
                    <span>{RESOURCE_MANAGER.getResource("NewProjectForm_ShowListContentSettings")}</span>
                    <span className={this.state.showListContentSettings ? "ChevronUp" : "ChevronDown"}>
                        <Icon iconName={this.state.showListContentSettings ? "ChevronUp" : "ChevronDown"} />
                    </span>
                </div>
                <section hidden={!this.state.showListContentSettings}>
                    {Object.keys(this.props.listData).map(key => (
                        <Toggle
                            key={key}
                            defaultChecked={this.props.listData[key].Default}
                            label={this.props.listData[key].Label}
                            onChanged={checked => this.props.toggleListContentHandler(key, checked)}
                            onText={RESOURCE_MANAGER.getResource("String_Yes")}
                            offText={RESOURCE_MANAGER.getResource("String_No")} />
                    ))}
                </section>
                <div onClick={e => this.setState({ showExtensionSettings: !this.state.showExtensionSettings })} className="ms-font-l toggle-section">
                    <span>Utvidelser</span>
                    <span className={this.state.showExtensionSettings ? "ChevronUp" : "ChevronDown"}>
                        <Icon iconName={this.state.showExtensionSettings ? "ChevronUp" : "ChevronDown"} />
                    </span>
                </div>
                <section hidden={!this.state.showExtensionSettings}>
                    {Object.keys(this.props.extensions).map(key => {
                        const extension: Extension = this.props.extensions[key];
                        return (
                            <Toggle
                                key={key}
                                defaultChecked={extension.IsEnabled}
                                label={extension.Title}
                                onChanged={checked => this.props.toggleExtensionHandler(key, checked, extension)}
                                onText={RESOURCE_MANAGER.getResource("String_Yes")}
                                offText={RESOURCE_MANAGER.getResource("String_No")} />
                        );
                    })}
                </section>
            </div>
        );
    }
}

