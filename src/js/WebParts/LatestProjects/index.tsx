import * as React from "react";
import { Site } from "sp-pnp-js";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as Util from "../../Util";
import ChromeTitle from "../@Components/ChromeTitle";
import ILatestProjectsProps, { LatestProjectsDefaultProps } from "./ILatestProjectsProps";
import ILatestProjectsState from "./ILatestProjectsState";
import BaseWebPart from "../@BaseWebPart";

export default class LatestProjects extends BaseWebPart<ILatestProjectsProps, ILatestProjectsState> {
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
    public componentDidMount(): void {
        this.fetchData()
            .then(updatedState => {
                this.setState({
                    ...updatedState,
                    isLoading: false,
                });
            })
            .catch(_ => this.setState({ isLoading: false }));

        if (this.props.reloadInterval !== -1) {
            this.reloadInterval = window.setInterval(() => {
                this.fetchData()
                    .then(updatedState => {
                        this.setState(updatedState);
                    });
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
                {this.renderChrome(this.props, this.state)}
                {this.renderItems(this.props, this.state)}
            </div>
        );
    }

    /**
    * Render chrome
    *
    * @param {ILatestProjectsProps} param0 Props
    * @param {ILatestProjectsState} param1 State
    */
    private renderChrome = ({ containerId }: ILatestProjectsProps, { }: ILatestProjectsState) => {
        return (
            <ChromeTitle
                title={__("WebPart_RecentProjects_Title")}
                toggleElement={{
                    selector: `#${containerId}`,
                    animationDelay: 100,
                    animation: "slideToggle",
                    storage: {
                        key: "LatestProjects",
                        type: "localStorage",
                    },
                }}
            />
        );
    }

    /**
     * Render items
    *
    * @param {ILatestProjectsProps} param0 Props
    * @param {ILatestProjectsState} param1 State
     */
    private renderItems = ({ containerId, listClassName, deleteEnabled }: ILatestProjectsProps, { isLoading, webinfos }: ILatestProjectsState) => {
        if (isLoading) {
            return (
                <Spinner type={SpinnerType.large} />
            );
        } else if (webinfos == null) {
            return (
                <div className="ms-metadata">
                    <Icon iconName="Error" style={{ color: "#000" }} />  {__("WebPart_FailedMessage")}
                </div>
            );
        } else if (webinfos.length > 0) {
            return (
                <div id={containerId}>
                    <ul className={listClassName}>
                        {webinfos.map(webinfo => (
                            <li key={webinfo.Id}>
                                {webinfo.Title ?
                                    <div>
                                        <h5><a href={webinfo.ServerRelativeUrl}>{webinfo.Title}</a></h5>
                                        <div className="ms-metadata">{__("String_Created")} {Util.dateFormat(webinfo.Created)}</div>
                                    </div>
                                    : (
                                        <div style={{ width: 100 }}>
                                            <Spinner type={SpinnerType.normal} />
                                        </div>
                                    )}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div id={this.props.containerId}>
                    <MessageBar>{__("WebPart_EmptyMessage")}</MessageBar>
                </div>
            );
        }
    }

    /**
     * Fetch data (webinfos)
     */
    private fetchData = () => new Promise<Partial<ILatestProjectsState>>((resolve, reject) => {
        const {
            itemsCount,
            itemsOrderBy,
        } = this.props;

        new Site(_spPageContextInfo.siteAbsoluteUrl)
            .rootWeb
            .webinfos
            .top(itemsCount)
            .select("Id", "ServerRelativeUrl", "Title", "Created")
            .orderBy(itemsOrderBy.orderBy, itemsOrderBy.ascending)
            .get().then(webinfos => {
                resolve({ webinfos: webinfos });
            }).catch(reject);
    })
}
