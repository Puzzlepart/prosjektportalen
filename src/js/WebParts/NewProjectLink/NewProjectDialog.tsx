import * as React from "react";
import { ProvisionWeb } from "Provision";
import * as ListDataConfig from "../../Provision/Data/Config";
import { Dialog, DialogType, DialogFooter, Button, ButtonType, TextField, Toggle } from "office-ui-fabric-react/lib";
import { IProjectModel } from "Model";
import * as Util from "Util";


interface INewProjectDialogState {
    showAdvancedSettings: boolean;
    urlValue: string;
    formValid: boolean;
    listDataConfig?: { [key: string]: ListDataConfig.IListConfig };
}

export class NewProjectDialog extends React.Component<any, INewProjectDialogState> {
    private inputs: { [key: string]: any } = {
        Title: null,
        Description: null,
        Url: null,
        InheritPermissions: null,
        IncludeContent: {
            Tasks: null,
            Documents: null,
            Stakeholders: null,
            Checklist: null,
        },
    };

    constructor() {
        super();
        this.state = {
            showAdvancedSettings: false,
            urlValue: "",
            formValid: false,
            listDataConfig: null,
        };
    }

    public componentDidMount() {
        ListDataConfig.RetrieveConfig().then(config => this.setState({ listDataConfig: config }));
    }

    public render() {
        let [{ className }, { showAdvancedSettings, urlValue, formValid, listDataConfig }] = [this.props, this.state];
        if (listDataConfig === null) {
            return null;
        }
        return (<Dialog
            className={className}
            isOpen={true}
            type={DialogType.largeHeader}
            onDismiss={this._closeDialog}
            title={__("NewProjectForm_DialogTitle")}
            subText=""
            isBlocking={false}
        >
            <TextField placeholder={__("NewProjectForm_Title")} ref={ele => this.inputs.Title = ele} onKeyDown={this.onTitleChanged} />
            <TextField placeholder={__("NewProjectForm_Description")} multiline autoAdjustHeight ref={ele => this.inputs.Description = ele} />
            <TextField placeholder={__("NewProjectForm_Url")} ref={ele => this.inputs.Url = ele} value={urlValue} disabled={false} />
            <Toggle
                defaultChecked={false}
                label={__("NewProjectForm_InheritPermissions")}
                onText={__("String_Yes")}
                offText={__("String_No")}
                ref={ele => this.inputs.InheritPermissions = ele}
                disabled />
            <div>
                <Toggle
                    defaultChecked={showAdvancedSettings}
                    label={__("NewProjectForm_ShowAdvancedSettings")}
                    onText={__("String_Yes")}
                    offText={__("String_No")}
                    onChanged={this.toggleAdvancedSettings} />
                <section className="advanced" style={{ display: showAdvancedSettings ? "block" : "none" }}>
                    {Object.keys(listDataConfig).map(key => (<Toggle
                        key={key}
                        defaultChecked={listDataConfig[key].Default}
                        label={listDataConfig[key].Label}
                        onText={__("String_Yes")}
                        offText={__("String_No")}
                        ref={ele => this.inputs.IncludeContent[key] = ele} />))}
                </section>
            </div>
            <DialogFooter>
                <Button buttonType={ButtonType.primary} onClick={this.onSubmit} disabled={!formValid}>{__("String_Create")}</Button>
                <Button onClick={this._closeDialog}>{__("String_Close")}</Button>
            </DialogFooter>
        </Dialog>);
    }

    private _closeDialog = (event) => {
        let { hideHandler } = this.props;
        hideHandler(event);
    }

    private toggleAdvancedSettings = (): void => {
        this.setState(prevState => ({ showAdvancedSettings: !prevState.showAdvancedSettings }));
    }

    private onTitleChanged = () => window.setTimeout(() => {
        let title = this.inputs.Title.value;
        let url = Util.generateUrl(title);
        this.setState({ urlValue: url, formValid: url.length >= 4 });
    }, 100)

    private getModel(): IProjectModel {
        let model: IProjectModel = {};
        Object.keys(this.inputs).forEach(key => model[key] = this.inputs[key].value || this.inputs[key].checked);
        model.IncludeContent = {};
        Object.keys(this.inputs.IncludeContent).forEach(key => model.IncludeContent[key] = this.inputs.IncludeContent[key].checked);
        return model;
    }

    private onSubmit = (event): void => {
        this._closeDialog(event);
        ProvisionWeb(this.getModel()).then(redirectUrl => {
            document.location.href = redirectUrl;
        }, (message) => {
            Util.userMessage(__("ProvisionWeb_Failed"), `<div>${message}</div>`, "red", 3000);
        });
    }
}
