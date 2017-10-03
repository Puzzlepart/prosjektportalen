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
    Spinner,
    SpinnerSize,
} from "office-ui-fabric-react/lib/Spinner";
import {
    GetProperty,
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
        super(props, {
            isLoading: true,
            settings: [],
        });
        this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
        this._onSaveChanges = this._onSaveChanges.bind(this);
        this._onSettingChanged = this._onSettingChanged.bind(this);
    }

    public shouldComponentUpdate(nextProps: IWebPropertyBagEditorProps, nextState: IWebPropertyBagEditorState) {
        return this.state.settings.length !== nextState.settings.length;
    }

    public async componentDidMount(): Promise<void> {
        const settingsString = await GetProperty(this.props.propKey);
        const settingsJson = JSON.parse(settingsString);
        let settings: ISetting[] = Object.keys(settingsJson)
            .map(key => {
                let setting: ISetting = {
                    settingKey: key,
                    settingValue: settingsJson[key],
                };
                if (this.props.settingsOptions[key]) {
                    setting.options = this.props.settingsOptions[key];
                }
                return setting;
            });
        return this.setState({ settings, isLoading: false });
    }

    public render() {
        if (this.state.isLoading) {
            return <Spinner size={SpinnerSize.large} />;
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
                    ]}
                    onRenderItemColumn={(item, index, column) => this._onRenderItemColumn(item, index, column)}
                    constrainMode={ConstrainMode.horizontalConstrained}
                    layoutMode={DetailsListLayoutMode.justified}
                    selectionMode={SelectionMode.none} />
                {this.state.isSaving ?
                    <Spinner size={SpinnerSize.large} />
                    :
                    <PrimaryButton
                        style={{ marginTop: 20, marginLeft: 0 }}
                        onClick={this._onSaveChanges}>Lagre endringer</PrimaryButton>}
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
        await SetProperty(this.props.propKey, JSON.stringify(settingsObject));
        this.setState({ isSaving: false });
    }
}
