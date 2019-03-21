import * as React from "react";
import INewProjectFormSettingsSectionProps from "./INewProjectFormSettingsSectionProps";
import INewProjectFormSettingsSectionState from "./INewProjectFormSettingsSectionState";
export default class NewProjectFormSettingsSection extends React.Component<INewProjectFormSettingsSectionProps, INewProjectFormSettingsSectionState> {
    static defaultProps: {
        toggleSectionClassName: string;
    };
    /**
    * Constructor
    *
    * @param {INewProjectFormSettingsSectionProps} props Props
    */
    constructor(props: INewProjectFormSettingsSectionProps);
    render(): JSX.Element;
}
