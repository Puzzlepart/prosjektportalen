import * as React from "react";
import RESOURCE_MANAGER from "../../@localization";
import { Site } from "sp-pnp-js";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as Util from "../../Util";
import ILatestProjectsProps, { LatestProjectsDefaultProps } from "./ILatestProjectsProps";
import ILatestProjectsState from "./ILatestProjectsState";
import BaseWebPart from "../@BaseWebPart";

export default class LatestProjects extends BaseWebPart<ILatestProjectsProps, ILatestProjectsState> {
    public static displayName = "LatestProjects";
    public static defaultProps = LatestProjectsDefaultProps;

    private reloadInterval: number;

    /**
     * Constructor
     *
     * @param {ILatestProjectsProps} props Props
     */
    constructor(props: ILatestProjectsProps) {
        super(props, {
            webinfos: null,
            isLoading: true,
        });
    }

    /**
     * Component did mount
     */
    public async componentDidMount() {
        const self = this;
        try {
            const webinfos = await this.fetchData();
            this.setState({
                webinfos,
                isLoading: false,
            });
        } catch (err) {
            this.setState({ isLoading: false });
        }

        if (this.props.reloadInterval !== -1) {
            this.reloadInterval = window.setInterval(async function () {
                const webinfos = await self.fetchData();
                self.setState({ webinfos });
            }, (this.props.reloadInterval * 1000));
        }
    }

    /**
     * Component will unmount
     */
    public componentWillUnmount(): void {
        window.clearInterval(this.reloadInterval);
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        return (
            <div>
                {this.__renderChrome(this.props.chromeTitle, this.state.elementToToggle, LatestProjects.displayName)}
                {this.renderItems()}
            </div>
        );
    }

    /**
     * Render items
     */
    private renderItems = () => {
        if (this.state.isLoading) {
            return (
                <Spinner type={SpinnerType.large} label={this.props.loadingText} />
            );
        } else if (this.state.webinfos == null) {
            return (
                <div className="ms-metadata">
                    <Icon iconName="Error" style={{ color: "#000" }} />  {RESOURCE_MANAGER.getResource("WebPart_FailedMessage")}
                </div>
            );
        } else if (this.state.webinfos.length > 0) {
            return (
                <div ref={elementToToggle => this.setState({ elementToToggle })}>
                    <ul className={this.props.listClassName}>
                        {this.state.webinfos.map(({ Id, Title, ServerRelativeUrl, Created }) => (
                            <li key={Id}>
                                {Title ?
                                    <div>
                                        <h5><a href={ServerRelativeUrl}>{Title}</a></h5>
                                        <div className="ms-metadata">{RESOURCE_MANAGER.getResource("String_Created")} {Util.dateFormat(Created)}</div>
                                    </div>
                                    : (
                                        <div style={{ width: 200 }}>
                                            <Spinner type={SpinnerType.normal} label={this.props.underCreationLabel} />
                                        </div>
                                    )}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div ref={elementToToggle => this.setState({ elementToToggle })}>
                    <MessageBar>{RESOURCE_MANAGER.getResource("WebPart_EmptyMessage")}</MessageBar>
                </div>
            );
        }
    }

    /**
     * Fetch data (webinfos)
     */
    private async fetchData(): Promise<any> {
        const webinfos = await new Site(_spPageContextInfo.siteAbsoluteUrl)
            .rootWeb
            .webinfos
            .top(this.props.itemsCount)
            .select("Id", "ServerRelativeUrl", "Title", "Created")
            .orderBy(this.props.itemsOrderBy.orderBy, this.props.itemsOrderBy.ascending)
            .get();
        return webinfos;
    }
}

export {
    ILatestProjectsProps,
    ILatestProjectsState,
};
