//#region Imports
import * as React from "react";
import RESOURCE_MANAGER from "../../@localization";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import ListConfig from "../../Provision/Data/Config/ListConfig";
import Extension from "../../Provision/Extensions/Extension";
//#endregion

export interface IToggleSectionProps extends React.HTMLAttributes<HTMLElement> {
    headerClassName?: string;
    options: any[];
    optLabelProp: string;
    optDefaultCheckedProp: string;
    toggleOptionHandler: (opt, checked: boolean) => void;
}

export interface IToggleSectionState {
    isExpanded: boolean;
}

export class ToggleSection extends React.Component<IToggleSectionProps, IToggleSectionState> {
    public static defaultProps = {
        headerClassName: "ms-font-l toggle-section",
    };

    /**
    * Constructor
    *
    * @param {IToggleSectionProps} props Props
    */
    constructor(props: IToggleSectionProps) {
        super(props);
        this.state = { isExpanded: false };
        this._onToggle = this._onToggle.bind(this);
    }

    public render() {
        return (
            <div hidden={this.props.hidden}>
                <div onClick={this._onToggle} className={this.props.headerClassName}>
                    <span>{this.props.title}</span>
                    <span className={this.state.isExpanded ? "ChevronUp" : "ChevronDown"}>
                        <Icon iconName={this.state.isExpanded ? "ChevronUp" : "ChevronDown"} />
                    </span>
                </div>
                <section hidden={!this.state.isExpanded}>
                    {this.props.options.map((opt, index) => {
                        return (
                            <div key={index}>
                                <Toggle
                                    defaultChecked={opt[this.props.optDefaultCheckedProp] === true}
                                    label={opt[this.props.optLabelProp]}
                                    onChanged={checked => this.props.toggleOptionHandler(opt, checked)}
                                    onText={RESOURCE_MANAGER.getResource("String_Yes")}
                                    offText={RESOURCE_MANAGER.getResource("String_No")} />
                                <div className="ms-font-xs" style={{ paddingTop: 10, paddingBottom: 10 }} hidden={!opt.Comments}>
                                    {opt.Comments}
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        );
    }

    /**
     * On toggle
     */
    private _onToggle() {
        this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
    }
}

export interface INewProjectFormSettingsSectionProps {
    className: string;
    toggleSectionClassName?: string;
    listData: ListConfig[];
    extensions: Extension[];
    toggleListContentHandler: (lc: ListConfig, checked: boolean) => void;
    toggleExtensionHandler: (extension: Extension, checked: boolean) => void;
}

export interface INewProjectFormSettingsSectionState { }

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

