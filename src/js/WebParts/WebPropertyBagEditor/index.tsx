import * as React from "react";
import __ from "../../Resources";
import { DetailsList, ConstrainMode, SelectionMode, DetailsListLayoutMode, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import IWebPropertyBagEditorProps, { WebPropertyBagEditorDefaultProps } from "./IWebPropertyBagEditorProps";
import IWebPropertyBagEditorState from "./IWebPropertyBagEditorState";
import { GetSettingsAndOptions, UpdateSettings } from "../../Settings";
import BaseWebPart from "../@BaseWebPart";

/**
 * Component: WebPropertyBagEditor
 */
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
    }

    public async componentDidMount(): Promise<void> {
        const { settings, options } = await GetSettingsAndOptions();
        this.setState({ settings, options, isLoading: false });
    }

    /**
     * Renders the <WebPropertyBagEditor /> component
     */
    public render(): React.ReactElement<IWebPropertyBagEditorProps> {
        if (this.state.isLoading) {
            return <Spinner size={SpinnerSize.large} />;
        }
        if (Object.keys(this.state.settings).length === 0) {
            return (
                <MessageBar messageBarType={MessageBarType.info}>{__.getResource("WebPropertyBagEditor_NoSettings")}</MessageBar>
            );
        }
        return (
            <div>
                <DetailsList
                    items={this._getItems()}
                    columns={this.props.columns}
                    onRenderItemColumn={this._onRenderItemColumn}
                    constrainMode={ConstrainMode.horizontalConstrained}
                    layoutMode={DetailsListLayoutMode.justified}
                    selectionMode={SelectionMode.none} />
                <div style={{ width: 400, marginTop: 20 }}>
                    {this.state.isSaving
                        ? <Spinner size={SpinnerSize.large} />
                        : (
                            <PrimaryButton
                                text={__.getResource("String_SaveChanges")}
                                disabled={this.state.isSaving}
                                style={{ margin: 0 }}
                                iconProps={{ iconName: "SaveAll" }}
                                onClick={this._onSaveChanges} />
                        )}
                    {this.state.statusMessage && (
                        <div style={{ marginTop: 20 }}>
                            <MessageBar messageBarType={this.state.statusMessage.messageBarType}>{this.state.statusMessage.children}</MessageBar>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    private _getItems() {
        return Object.keys(this.state.settings).map(key => ({
            key,
            value: this.state.settings[key],
            options: this.state.options[key],
        }));
    }

    /**
     * On render item column
     *
     * @param {any} item Item
     * @param {number} index index
     * @param {IColumn} column Column
     */
    @autobind
    private _onRenderItemColumn(item, index: number, column: IColumn) {
        const colValue = item[column.fieldName];
        if (column.fieldName === "value") {
            if (item.options) {
                return (
                    <div style={{ width: 200 }}>
                        <Dropdown
                            disabled={this.state.isSaving}
                            onChanged={option => this._onSettingChanged(item, `${option.key}`)}
                            defaultSelectedKey={colValue}
                            options={item.options.map(text => ({ key: text, text }))} />
                    </div>
                );
            }
            return (
                <div style={{ width: 200 }}>
                    <TextField
                        disabled={this.state.isSaving}
                        onChanged={newValue => this._onSettingChanged(item, newValue)}
                        value={colValue} />
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
    @autobind
    private async _onSaveChanges() {
        let { settings } = this.state;
        this.setState({ isSaving: true }, async () => {
            await UpdateSettings(settings);
            const statusMessage = {
                messageBarType: MessageBarType.success,
                children: <span>{__.getResource("String_ChangesWasSaved")}</span>,
            };
            this.setState({ isSaving: false, statusMessage });
            window.setTimeout(() => {
                this.setState({ statusMessage: null });
            }, 5000);
        });
    }
}

export {
    IWebPropertyBagEditorProps,
    IWebPropertyBagEditorState,
};
