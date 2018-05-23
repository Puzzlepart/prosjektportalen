import * as React from "react";
import RESOURCE_MANAGER from "../../Resources";
import { DetailsList, ConstrainMode, SelectionMode, DetailsListLayoutMode, IColumn } from "office-ui-fabric-react/lib/DetailsList";
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

    public render(): React.ReactElement<IWebPropertyBagEditorProps> {
        if (this.state.isLoading) {
            return <Spinner size={SpinnerSize.large} />;
        }
        if (Object.keys(this.state.settings).length === 0) {
            return <MessageBar messageBarType={MessageBarType.info}>{RESOURCE_MANAGER.getResource("WebPropertyBagEditor_NoSettings")}</MessageBar>;
        }
        const items = Object.keys(this.state.settings).map(key => ({
            key,
            value: this.state.settings[key],
            options: this.state.options[key],
        }));
        return (
            <div>
                <DetailsList
                    items={items}
                    columns={this.props.columns}
                    onRenderItemColumn={this._onRenderItemColumn}
                    constrainMode={ConstrainMode.horizontalConstrained}
                    layoutMode={DetailsListLayoutMode.justified}
                    selectionMode={SelectionMode.none} />
                <div style={{ width: 400, marginTop: 20 }}>
                    {this.state.isSaving ?
                        <Spinner size={SpinnerSize.large} />
                        :
                        <PrimaryButton
                            text={RESOURCE_MANAGER.getResource("String_SaveChanges")}
                            disabled={this.state.isSaving}
                            style={{ margin: 0 }}
                            iconProps={{ iconName: "SaveAll" }}
                            onClick={this._onSaveChanges} />}
                    {this.state.statusMessage && (
                        <div style={{ marginTop: 20 }}>
                            <MessageBar messageBarType={this.state.statusMessage.messageBarType}>{this.state.statusMessage.children}</MessageBar>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    /**
     * On render item column
     *
     * @param {any} item Item
     * @param {number} index index
     * @param {IColumn} column Column
     */
    private _onRenderItemColumn(item, index: number, column: IColumn) {
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
        this.setState({ isSaving: true }, async () => {
            await UpdateSettings(settings);
            this.setState({
                isSaving: false,
                statusMessage: {
                    messageBarType: MessageBarType.success,
                    children: <span>{RESOURCE_MANAGER.getResource("String_ChangesWasSaved")}</span>,
                },
            }, () => {
                window.setTimeout(() => {
                    this.setState({ statusMessage: null });
                }, 5000);
            });
        });
    }
}

export {
    IWebPropertyBagEditorProps,
    IWebPropertyBagEditorState,
};
