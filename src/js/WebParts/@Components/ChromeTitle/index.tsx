import * as React from "react";
import * as jQuery from "jquery";
import { Icon } from "office-ui-fabric-react";
import * as Util from "../../../Util";

export interface IToggleElementStorage {
    key: string;
    type: "localStorage" | "sessionStorage";
}

export interface IToggleElement {
    selector: string;
    slideDelay: number;
    storage?: IToggleElementStorage;
}

export interface IChromeTitleProps {
    title: string;
    toggleElement?: IToggleElement;
}

export interface IChromeTitleState {
    isCollapsed: boolean;
}

class ChromeTitle extends React.PureComponent<IChromeTitleProps, IChromeTitleState> {
    private toggleStorageKey: string = "";

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            isCollapsed: false,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        const { toggleElement } = this.props;
        if (toggleElement.storage) {
            this.toggleStorageKey = Util.generateStorageKey([toggleElement.storage.key, "CollapsedState"]);
        }

        let newState = {
            isCollapsed: this.getCollapsedState(),
        };
        this.setState(newState);

        if (newState.isCollapsed) {
            jQuery(this.props.toggleElement.selector).hide();
        }
    };

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const { isCollapsed } = this.state;

        const h2Style: React.CSSProperties = {
            textAlign: "justify",
            position: "relative",
        };

        if (this.props.toggleElement) {
            h2Style.cursor = "pointer";
        }

        return (<div
            className="ms-webpart-chrome-title"
            onClick={this.onClick}>
            <span
                title={this.props.title}
                className="js-webpart-titleCell">
                <h2
                    style={h2Style}
                    className="ms-webpart-titleText">
                    <span>{this.props.title}</span>
                    <Icon
                        hidden={!this.props.toggleElement}
                        iconName={isCollapsed ? "ChevronDown" : "ChevronUp"}
                        style={{
                            fontSize: 14,
                            position: "absolute",
                            right: 5,
                            top: 10,
                        }} />
                </h2>
            </span>
        </div >);
    }

    /**
     * On chrome click
     */
    private onClick = () => {
        const { toggleElement } = this.props;
        if (!toggleElement) {
            return;
        }
        const { isCollapsed } = this.state;
        jQuery(toggleElement.selector).slideToggle(toggleElement.slideDelay, () => {
            let newState = { isCollapsed: !isCollapsed };
            this.setState(newState);
            if (toggleElement.storage) {
                window[toggleElement.storage.type].setItem(this.toggleStorageKey, JSON.stringify(newState.isCollapsed));
            }
        });
    }

    /**
     * Get collapsed state from storage
     */
    private getCollapsedState(): boolean {
        const { toggleElement } = this.props;
        if (!toggleElement.storage) {
            return false;
        }
        const value = window[toggleElement.storage.type].getItem(this.toggleStorageKey);
        if (value) {
            return JSON.parse(value);
        } else {
            return false;
        }
    }
}

export default ChromeTitle;
