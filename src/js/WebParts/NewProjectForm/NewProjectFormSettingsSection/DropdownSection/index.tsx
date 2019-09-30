//#region Imports
import * as React from "react";
import __ from "../../../../Resources";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import IDropdownSectionProps from "./IDropdownSectionProps";
import IDropdownSectionState from "./IDropdownSectionState";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
//#endregion


export default class DropdownSection extends React.Component<IDropdownSectionProps, IDropdownSectionState> {
    public static defaultProps = { headerClassName: "ms-font-l settings-section" };

    /**
    * Constructor
    *
    * @param {IDropdownSectionProps} props Props
    */
    constructor(props: IDropdownSectionProps) {
        super(props);
        this.state = { isExpanded: false };
        this.onToggle = this.onToggle.bind(this);
    }

    public render() {
        return (
            <div hidden={this.props.hidden}>
                <div style={{ paddingTop: 8, paddingBottom: 8 }} onClick={this.onToggle} className={this.props.headerClassName}>
                    <span>{this.props.title}</span>
                    <span style={{ paddingLeft: 8 }}className={this.state.isExpanded ? "ChevronUp" : "ChevronDown"}>
                        <Icon iconName={this.state.isExpanded ? "ChevronUp" : "ChevronDown"} />
                    </span>
                </div>
                <section hidden={!this.state.isExpanded}>
                    <Dropdown
                        placeholder={this.props.placeholder}
                        options={this.props.options}
                        onChanged={this.props.onChanged} />
                </section>
            </div>
        );
    }

    /**
     * On toggle
     */
    private onToggle() {
        this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
    }
}
