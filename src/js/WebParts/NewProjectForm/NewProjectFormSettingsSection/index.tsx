//#region Imports
import * as React from 'react'
import __ from '../../../Resources'
import INewProjectFormSettingsSectionProps from './INewProjectFormSettingsSectionProps'
import ToggleSection from './ToggleSection'
import DropdownSection, { IDropdownOption } from './DropdownSection'
//#endregion

export default class NewProjectFormSettingsSection extends React.Component<INewProjectFormSettingsSectionProps, {}> {
    public static defaultProps = { toggleSectionClassName: 'ms-font-l settings-section' };

    /**
    * Constructor
    *
    * @param {INewProjectFormSettingsSectionProps} props Props
    */
    constructor(props: INewProjectFormSettingsSectionProps) {
        super(props)
        this.state = {}
    }

    public render() {
        return (
            <div className={this.props.className}>
                <DropdownSection
                    title={__.getResource('NewProjectForm_ShowProjecttypesSettings')}
                    options={this._projectTypeOptions}
                    onChanged={option => this.props.onProjectTypeChanged(option.data)}
                    hidden={this.props.config.projectTypes.length === 0} />
                <ToggleSection
                    title={__.getResource('NewProjectForm_ShowListContentSettings')}
                    options={this.props.config.listData}
                    selected={this.props.model.includeContent.map(ic => ic.Id)}
                    optLabelProp='Label'
                    optDefaultCheckedProp='Default'
                    onChanged={this.props.onListContentChanged}
                    hidden={this.props.config.listData.length === 0} />
                <ToggleSection
                    title={__.getResource('NewProjectForm_ShowExtensionSettings')}
                    options={this.props.config.extensions}
                    selected={this.props.model.extensions.map(ic => ic.Id)}
                    optLabelProp='Title'
                    optDefaultCheckedProp='IsEnabled'
                    onChanged={this.props.onExtensionsChanged}
                    hidden={this.props.config.extensions.length === 0} />
            </div>
        )
    }

    private get _projectTypeOptions(): IDropdownOption[] {
        return [
            {
                key: null,
                text: '',
            },
            ...this.props.config.projectTypes.map(t => ({ key: t.title, text: t.title, data: t })),
        ]
    }
}

