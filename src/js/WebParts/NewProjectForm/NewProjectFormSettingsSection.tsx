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
    toggleSectionClassName?: string;
    listData: ListConfig[];
    extensions: Extension[];
    toggleListContentHandler: (lc: ListConfig, checked: boolean) => void;
    toggleExtensionHandler: (extension: Extension, checked: boolean) => void;
}

export interface INewProjectFormSettingsSectionState {
    showListContentSettings: boolean;
    showExtensionSettings: boolean;
}

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
        this.state = {
            showListContentSettings: false,
            showExtensionSettings: false,
        };
    }

    public render() {
        const { className, toggleSectionClassName, listData, extensions, toggleListContentHandler, toggleExtensionHandler } = this.props;
        const { showListContentSettings, showExtensionSettings } = this.state;

        const listDataKeys = Object.keys(listData);

        return (
            <div className={className}>
                <div hidden={listDataKeys.length === 0}>
                    <div onClick={e => this.setState({ showListContentSettings: !showListContentSettings })} className={toggleSectionClassName}>
                        <span>{RESOURCE_MANAGER.getResource("NewProjectForm_ShowListContentSettings")}</span>
                        <span className={showListContentSettings ? "ChevronUp" : "ChevronDown"}>
                            <Icon iconName={showListContentSettings ? "ChevronUp" : "ChevronDown"} />
                        </span>
                    </div>
                    <section hidden={!showListContentSettings}>
                        {listData.map((lc, index) => (
                            <Toggle
                                key={`ListData_${index}`}
                                defaultChecked={lc.Default}
                                label={lc.Label}
                                onChanged={checked => toggleListContentHandler(lc, checked)}
                                onText={RESOURCE_MANAGER.getResource("String_Yes")}
                                offText={RESOURCE_MANAGER.getResource("String_No")} />
                        ))}
                    </section>
                </div>
                <div hidden={extensions.length === 0}>
                    <div onClick={e => this.setState({ showExtensionSettings: !showExtensionSettings })} className={toggleSectionClassName}>
                        <span>{RESOURCE_MANAGER.getResource("NewProjectForm_ShowExtensionSettings")}</span>
                        <span className={showExtensionSettings ? "ChevronUp" : "ChevronDown"}>
                            <Icon iconName={showExtensionSettings ? "ChevronUp" : "ChevronDown"} />
                        </span>
                    </div>
                    <section hidden={!showExtensionSettings}>
                        {extensions.map((extension, index) => {
                            return (
                                <div>
                                    <Toggle
                                        key={`Extension_${index}`}
                                        defaultChecked={extension.IsEnabled}
                                        label={extension.Title}
                                        onChanged={checked => toggleExtensionHandler(extension, checked)}
                                        onText={RESOURCE_MANAGER.getResource("String_Yes")}
                                        offText={RESOURCE_MANAGER.getResource("String_No")} />
                                    <div className="ms-font-xs" style={{ paddingTop: 10, paddingBottom: 10 }} hidden={!extension.Comments}>
                                        {extension.Comments}
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                </div>
            </div>
        );
    }
}

