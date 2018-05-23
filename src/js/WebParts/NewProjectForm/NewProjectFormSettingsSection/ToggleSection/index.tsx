//#region Imports
import * as React from "react";
import RESOURCE_MANAGER from "../../../../Resources";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import IToggleSectionProps from "./IToggleSectionProps";
import IToggleSectionState from "./IToggleSectionState";
//#endregion


export default class ToggleSection extends React.Component<IToggleSectionProps, IToggleSectionState> {
    public static defaultProps = {
        headerClassName: "ms-font-l toggle-section",
    };

    /**
    * Constructor
    *
    * @param {IToggleSectionProps} props Props
    */
    constructor(props: IToggleSectionProps) {
        super(props);
        this.state = { isExpanded: false };
        this._onToggle = this._onToggle.bind(this);
    }

    public render() {
        return (
            <div hidden={this.props.hidden}>
                <div onClick={this._onToggle} className={this.props.headerClassName}>
                    <span>{this.props.title}</span>
                    <span className={this.state.isExpanded ? "ChevronUp" : "ChevronDown"}>
                        <Icon iconName={this.state.isExpanded ? "ChevronUp" : "ChevronDown"} />
                    </span>
                </div>
                <section hidden={!this.state.isExpanded}>
                    {this.props.options.map((opt, index) => {
                        return (
                            <div key={index}>
                                <Toggle
                                    defaultChecked={opt[this.props.optDefaultCheckedProp] === true}
                                    label={opt[this.props.optLabelProp]}
                                    onChanged={checked => this.props.toggleOptionHandler(opt, checked)}
                                    onText={RESOURCE_MANAGER.getResource("String_Yes")}
                                    offText={RESOURCE_MANAGER.getResource("String_No")} />
                                <div className="ms-font-xs" style={{ paddingTop: 10, paddingBottom: 10 }} hidden={!opt.Comments}>
                                    {opt.Comments}
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        );
    }

    /**
     * On toggle
     */
    private _onToggle() {
        this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
    }
}
