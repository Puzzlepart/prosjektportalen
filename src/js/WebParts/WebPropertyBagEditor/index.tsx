import * as React from "react";
import {
    DetailsList,
    ConstrainMode,
    SelectionMode,
    DetailsListLayoutMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import {
    Dropdown,
    IDropdownOption,
} from "office-ui-fabric-react/lib/Dropdown";
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
    private readOnlySettings = ["pp_version", "pp_datasourcesiteurl", "pp_assetssiteurl"];
    private settingsOptions: { [key: string]: IDropdownOption[] } = {
        pp_loglevel: [
            { key: "3", text: "Error" },
            { key: "2", text: "Warning" },
            { key: "1", text: "Info" },
        ],
    };

    /**
     * Constructor
     *
     * @param {IWebPropertyBagEditorProps} props Props
     */
    constructor(props: IWebPropertyBagEditorProps) {
        super(props, {
            isLoading: true,
            settings: [],
            userInput: {},
        });
        this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
        this._onSaveSetting = this._onSaveSetting.bind(this);
        this._onSettingChanged = this._onSettingChanged.bind(this);
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
                    readOnly: this.readOnlySettings.indexOf(key) !== -1,
                };
                if (this.settingsOptions[key]) {
                    setting.options = this.settingsOptions[key];
                }
                return setting;
            });
        return this.setState({ settings });
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
        console.log("_onRenderItemColumn", column.fieldName);

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
            const userValue = this.state.userInput[item.settingKey];
            const showButton = userValue && userValue !== item.settingValue;
            return (
                <div
                    hidden={!showButton}
                    style={{ width: 200 }}>
                    <PrimaryButton onClick={e => this._onSaveSetting(item, userValue)}>Lagre</PrimaryButton>
                </div>
            );
        }
        return colValue;
    }

    private _onSettingChanged(setting: ISetting, newValue: string) {
        console.log("_onSettingChanged");
        let userInput = this.state.userInput;
        userInput[setting.settingKey] = newValue;
        console.log(userInput);
        this.setState({ userInput });
    }

    private async _onSaveSetting(setting: ISetting, newValue: string) {
        console.log("_onSaveSetting");
        await SetProperty(setting.settingKey, newValue);
        this.setState({
            settings: this.state.settings.map(s => {
                if (s.settingKey = setting.settingKey) {
                    s.settingValue = newValue;
                }
                return s;
            }),
        });
    }
}
