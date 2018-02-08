import * as React from "react";
import RESOURCE_MANAGER from "../../@localization";
import { DetailsList, ConstrainMode, SelectionMode, DetailsListLayoutMode } from "office-ui-fabric-react/lib/DetailsList";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import IWebPropertyBagEditorProps, { WebPropertyBagEditorDefaultProps } from "./IWebPropertyBagEditorProps";
import IWebPropertyBagEditorState from "./IWebPropertyBagEditorState";
import { GetSettingsAndOptions, UpdateSettings } from "../../Settings";
import BaseWebPart from "../@BaseWebPart";

export default class WebPropertyBagEditor extends BaseWebPart<IWebPropertyBagEditorProps, IWebPropertyBagEditorState> {
    public static displayName = "WebPropertyBagEditor";
    public static defaultProps = WebPropertyBagEditorDefaultProps;

    /**
     * Constructor
     *
     * @param {IWebPropertyBagEditorProps} props Props
     */
    constructor(props: IWebPropertyBagEditorProps) {
        super(props, { isLoading: true });
        this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
        this._onSaveChanges = this._onSaveChanges.bind(this);
        this._onSettingChanged = this._onSettingChanged.bind(this);
    }

    public async componentDidMount(): Promise<void> {
        const { settings, options } = await GetSettingsAndOptions();
        this.setState({ settings, options, isLoading: false });
    }

    public render() {
        if (this.state.isLoading) {
            return <Spinner size={SpinnerSize.large} />;
        }
        const settingsKeys = Object.keys(this.state.settings);
        if (settingsKeys.length === 0) {
            return <MessageBar messageBarType={MessageBarType.info}>{RESOURCE_MANAGER.getResource("WebPropertyBagEditor_NoSettings")}</MessageBar>;
        }
        return (
            <div>
                <DetailsList
                    items={settingsKeys.map(key => ({
                        key,
                        value: this.state.settings[key],
                        options: this.state.options[key],
                    }))}
                    columns={[
                        {
                            key: "key",
                            fieldName: "key",
                            name: RESOURCE_MANAGER.getResource("SiteFields_GtKey_DisplayName"),
                            minWidth: 150,
                            maxWidth: 200,
                        },
                        {
                            key: "value",
                            fieldName: "value",
                            name: RESOURCE_MANAGER.getResource("SiteFields_GtValue_DisplayName"),
                            minWidth: 100,
                            maxWidth: 300,
                        },
                    ]}
                    onRenderItemColumn={(item, index, column) => this._onRenderItemColumn(item, index, column)}
                    constrainMode={ConstrainMode.horizontalConstrained}
                    layoutMode={DetailsListLayoutMode.justified}
                    selectionMode={SelectionMode.none} />
                <div style={{ width: 200 }}>
                    {this.state.isSaving ?
                        <Spinner size={SpinnerSize.large} />
                        :
                        <PrimaryButton
                            text={RESOURCE_MANAGER.getResource("String_SaveChanges")}
                            disabled={this.state.isSaving}
                            style={{ marginTop: 20, marginLeft: 0 }}
                            onClick={this._onSaveChanges} />}
                </div>
            </div>
        );
    }

    private _onRenderItemColumn(item, index, column) {
        const colValue = item[column.fieldName];
        if (column.fieldName === "value") {
            if (item.options) {
                return (
                    <div style={{ width: 200 }}>
                        <Dropdown
                            disabled={this.state.isSaving}
                            onChanged={option => {
                                this._onSettingChanged(item, `${option.key}`);
                            }}
                            defaultSelectedKey={colValue}
                            options={item.options.map(text => ({ key: text, text }))} />
                    </div>
                );
            }
            return (
                <div style={{ width: 200 }}>
                    <TextField
                        disabled={this.state.isSaving}
                        onChanged={newValue => {
                            this._onSettingChanged(item, newValue);
                        }}
                        defaultValue={colValue} />
                </div>
            );
        }
        return colValue;
    }

    /**
     * On setting changed
     *
     * @param {any} setting Setting
     * @param {string} newValue New value
     */
    private _onSettingChanged(setting: any, newValue: string) {
        let { settings } = this.state;
        settings[setting.key] = newValue;
        this.setState({ settings });
    }

    /**
     * On save changes
     */
    private async _onSaveChanges() {
        let { settings } = this.state;
        this.setState({ isSaving: true });
        await UpdateSettings(settings);
        this.setState({ isSaving: false });
    }
}

export {
    IWebPropertyBagEditorProps,
    IWebPropertyBagEditorState,
};
