import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as Util from "../../../Util";
import IToggleElement from "./IToggleElement";
import IChromeTitleProps from "./IChromeTitleProps";
import IChromeTitleState from "./IChromeTitleState";

export default class ChromeTitle extends React.PureComponent<IChromeTitleProps, IChromeTitleState> {
    public static defaultProps: Partial<IChromeTitleProps> = {
        hidden: false,
        width: "100%",
    };
    /**
     * Chrome header style
     */
    private h2Style: React.CSSProperties = {
        textAlign: "justify",
        position: "relative",
    };

    /**
     * Icon style
     */
    private iconStyle: React.CSSProperties = {
        fontSize: 14,
        position: "absolute",
        right: 5,
        top: 10,
    };

    /**
     * Toggle storage key
     */
    private toggleStorageKey: string = "";

    /**
     * Constructor
     *
     * @param {IChromeTitleProps} props Props
     */
    constructor(props: IChromeTitleProps) {
        super(props);
        this.state = {
            isCollapsed: false,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        if (!this.props.toggleElement) {
            return;
        }
        const { storage, element } = this.props.toggleElement;
        if (storage && element) {
            this.toggleStorageKey = Util.generateStorageKey([storage.key, "CollapsedState"]);
            let newState = {
                isCollapsed: this.getCollapsedStateFromStorage(),
            };
            this.setState(newState);
            if (newState.isCollapsed) {
                element.style.display = "none";
            }

        }
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        if (this.props.toggleElement) {
            this.h2Style.cursor = "pointer";
        }

        return (
            <div
                hidden={this.props.hidden}
                className="ms-webpart-chrome-title"
                onClick={this.onClick}
                style={{ width: this.props.width }}>
                <span
                    title={this.props.title}
                    className="js-webpart-titleCell">
                    <h2
                        style={this.h2Style}
                        className="ms-webpart-titleText">
                        <span>{this.props.title}</span>
                        {this.props.toggleElement && <Icon
                            iconName={this.state.isCollapsed ? "ChevronDown" : "ChevronUp"}
                            style={this.iconStyle} />}
                    </h2>
                </span>
            </div >
        );
    }

    /**
     * On chrome click
     */
    private onClick = () => {
        if (!this.props.toggleElement) {
            return;
        }
        const { storage, element } = this.props.toggleElement;
        const { isCollapsed } = this.state;
        let newState = { isCollapsed: !isCollapsed };
        this.setState(newState);
        element.style.display = newState.isCollapsed ? "none" : "block";
        if (storage) {
            window[storage.type].setItem(this.toggleStorageKey, JSON.stringify(newState.isCollapsed));
        }
    }

    /**
     * Get collapsed state from storage (localStorage or sessionStorage)
     */
    private getCollapsedStateFromStorage(): boolean {
        const { storage } = this.props.toggleElement;
        const value = window[storage.type].getItem(this.toggleStorageKey);
        if (value) {
            try {
                const parsedValue = JSON.parse(value);
                return parsedValue;
            } catch (e) {
                return true;
            }
        } else {
            return true;
        }
    }
}

export {
    IToggleElement,
    IChromeTitleProps,
    IChromeTitleState,
};
