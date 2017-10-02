import * as React from "react";
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
    GetAllProperties,
    SetProperty,
} from "../../Util/PropertyBag";
import IWebPropertyBagEditorProps from "./IWebPropertyBagEditorProps";
import IWebPropertyBagEditorState from "./IWebPropertyBagEditorState";
import ISetting from "./ISetting";
import BaseWebPart from "../@BaseWebPart";

export default class WebPropertyBagEditor extends BaseWebPart<IWebPropertyBagEditorProps, IWebPropertyBagEditorState> {
    public static displayName = "WebPropertyBagEditor";

    /**
     * Constructor
     *
     * @param {IWebPropertyBagEditorProps} props Props
     */
    constructor(props: IWebPropertyBagEditorProps) {
        super(props, {
            isLoading: true,
            settings: [],
        });
        this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
        this._onSaveSetting = this._onSaveSetting.bind(this);
        this._onSettingChanged = this._onSettingChanged.bind(this);
    }

    public shouldComponentUpdate(nextProps: IWebPropertyBagEditorProps, nextState: IWebPropertyBagEditorState) {
        return this.state.settings.length !== nextState.settings.length;
    }

    /**
     * Component did mount
     */
    public async componentDidMount(): Promise<void> {
        const properties = await GetAllProperties();
        let settings: ISetting[] = Object.keys(properties)
            .filter(key => {
                return key.match(/pp_.*/g) != null;
            })
            .map(key => {
                let setting: ISetting = {
                    settingKey: key,
                    settingValue: properties[key],
                    readOnly: this.props.readOnlySettings.indexOf(key) !== -1,
                };
                if (this.props.settingsOptions[key]) {
                    setting.options = this.props.settingsOptions[key];
                }
                return setting;
            });
        return this.setState({ settings, isLoading: false });
    }

    public render() {
        return (
            <DetailsList
                key={new Date().getTime()}
                items={this.state.settings}
                columns={[
                    {
                        key: "settingKey",
                        fieldName: "settingKey",
                        name: "Nøkkel",
                        minWidth: 100,
                        maxWidth: 150,
                    },
                    {
                        key: "settingValue",
                        fieldName: "settingValue",
                        name: "Verdi",
                        minWidth: 100,
                        maxWidth: 300,
                    },
                    {
                        key: "saveButton",
                        fieldName: "saveButton",
                        name: "",
                        minWidth: 100,
                    },
                ]}
                onRenderItemColumn={(item, index, column) => this._onRenderItemColumn(item, index, column)}
                constrainMode={ConstrainMode.horizontalConstrained}
                layoutMode={DetailsListLayoutMode.justified}
                selectionMode={SelectionMode.none} />
        );
    }

    private _onRenderItemColumn(item: ISetting, index, column) {
        const colValue = item[column.fieldName];
        if (column.fieldName === "settingValue") {
            if (item.options) {
                return (
                    <div style={{ width: 200 }}>
                        <Dropdown
                            onChanged={option => {
                                this._onSettingChanged(item, `${option.key}`);
                            }}
                            defaultSelectedKey={item.settingValue}
                            options={item.options} />
                    </div>
                );
            }
            return (
                <div style={{ width: 200 }}>
                    <TextField
                        onChanged={newValue => {
                            this._onSettingChanged(item, newValue);
                        }}
                        defaultValue={colValue}
                        disabled={item.readOnly} />
                </div>
            );
        }
        if (column.fieldName === "saveButton") {
            return (
                <div style={{ width: 200 }}>
                    <PrimaryButton key={`${item.settingKey}_SaveBtn`} onClick={e => this._onSaveSetting(item)}>Lagre</PrimaryButton>
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

    private async _onSaveSetting(setting: ISetting) {
        await SetProperty(setting.settingKey, setting.settingValue);
        return;
    }
}
