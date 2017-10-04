import * as React from "react";
import RESOURCE_MANAGER from "localization";
import {
    DetailsList,
    ConstrainMode,
    SelectionMode,
    DetailsListLayoutMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import {
    Spinner,
    SpinnerSize,
} from "office-ui-fabric-react/lib/Spinner";
import {
    MessageBar,
    MessageBarType,
} from "office-ui-fabric-react/lib/MessageBar";
import {
    GetAllProperties,
    SetProperty,
} from "../../Util/PropertyBag";
import IWebPropertyBagEditorProps, { WebPropertyBagEditorDefaultProps } from "./IWebPropertyBagEditorProps";
import IWebPropertyBagEditorState from "./IWebPropertyBagEditorState";
import ISetting from "./ISetting";
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

    public shouldComponentUpdate(nextProps: IWebPropertyBagEditorProps, nextState: IWebPropertyBagEditorState) {
        return (this.state.isLoading !== nextState.isLoading || this.state.isSaving !== nextState.isSaving);
    }

    public async componentDidMount(): Promise<void> {
        const webProperties = await GetAllProperties();
        let settingsJson, settingsOptionsJson;
        try {
            settingsJson = JSON.parse(webProperties[this.props.settingsPropKey]);
        } catch (err) {
            settingsJson = {};
        }
        try {
            settingsOptionsJson = JSON.parse(webProperties[this.props.settingsOptionsPropKey]);
        } catch (err) {
            settingsOptionsJson = {};
        }
        let settings: ISetting[] = Object.keys(settingsJson)
            .map(key => {
                let setting: ISetting = {
                    settingKey: key,
                    settingValue: settingsJson[key],
                };
                if (settingsOptionsJson[key]) {
                    setting.options = settingsOptionsJson[key];
                }
                return setting;
            });
        return this.setState({ settings, isLoading: false });
    }

    public render() {
        if (this.state.isLoading) {
            return <Spinner size={SpinnerSize.large} />;
        }
        if (this.state.settings.length === 0) {
            return <MessageBar messageBarType={MessageBarType.info}>{RESOURCE_MANAGER.getResource("WebPropertyBagEditor_NoSettings")}</MessageBar>;
        }
        return (
            <div>
                <DetailsList
                    key={new Date().getTime()}
                    items={this.state.settings}
                    columns={[
                        {
                            key: "settingKey",
                            fieldName: "settingKey",
                            name: RESOURCE_MANAGER.getResource("SiteFields_GtKey_DisplayName"),
                            minWidth: 150,
                            maxWidth: 200,
                        },
                        {
                            key: "settingValue",
                            fieldName: "settingValue",
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
                            style={{ marginTop: 20, marginLeft: 0 }}
                            onClick={this._onSaveChanges}>{RESOURCE_MANAGER.getResource("String_SaveChanges")}</PrimaryButton>}
                </div>
            </div>
        );
    }

    private _onRenderItemColumn(item: ISetting, index, column) {
        const colValue = item[column.fieldName];
        if (column.fieldName === "settingValue") {
            if (item.options) {
                return (
                    <div style={{ width: 200 }}>
                        <Dropdown
                            disabled={this.state.isSaving}
                            onChanged={option => {
                                this._onSettingChanged(item, `${option.key}`);
                            }}
                            defaultSelectedKey={item.settingValue}
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

    private _onSettingChanged({ settingKey }: ISetting, newValue: string) {
        this.setState({
            settings: this.state.settings.map(setting => {
                if (setting.settingKey === settingKey) {
                    setting.settingValue = newValue;
                }
                return setting;
            }),
        });
    }

    private async _onSaveChanges() {
        this.setState({ isSaving: true });
        let settingsObject = this.state.settings.reduce((obj, { settingKey, settingValue }) => {
            obj[settingKey] = settingValue;
            return obj;
        }, {});
        await SetProperty(this.props.settingsPropKey, JSON.stringify(settingsObject));
        this.setState({ isSaving: false });
    }
}
