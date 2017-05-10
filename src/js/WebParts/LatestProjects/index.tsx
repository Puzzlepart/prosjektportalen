import * as React from "react";
import { Site } from "sp-pnp-js";
import {
    Spinner,
    SpinnerType,
    Icon,
} from "office-ui-fabric-react";
import * as Util from "../../Util";

export interface IWebInfo {
    Id: number;
    ServerRelativeUrl: string;
    Title: string;
    Created: string;
}

export interface ILatestProjectsProps {
    itemsCount?: number;
    itemsOrderBy?: { orderBy: string, ascending: boolean };
    reloadIntervalMs?: number;
}

export interface ILatestProjectsState {
    webinfos: IWebInfo[];
    isLoading: boolean;
}

export default class LatestProjects extends React.PureComponent<ILatestProjectsProps, ILatestProjectsState> {
    public static defaultProps: ILatestProjectsProps = {
        itemsCount: 5,
        itemsOrderBy: {
            orderBy: "Created",
            ascending: false,
        },
        reloadIntervalMs: -1,
    };
    private reloadInterval: number;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            webinfos: null,
            isLoading: true,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        const { reloadIntervalMs } = this.props;

        this.fetchData()
            .then(webinfos => {
                this.setState({
                    webinfos: webinfos,
                    isLoading: false,
                });
            })
            .catch(_ => this.setState({ isLoading: false }));

        if (reloadIntervalMs !== -1) {
            this.reloadInterval = window.setInterval(() => {
                this.fetchData()
                    .then(webinfos => {
                        this.setState({
                            webinfos: webinfos,
                        });
                    });
            }, reloadIntervalMs);
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
        let {
            webinfos,
            isLoading,
        } = this.state;
        if (isLoading) {
            return (<Spinner type={SpinnerType.large} />);
        }
        if (webinfos == null) {
            return (<div className="ms-metadata"><Icon iconName="Error" style={{ color: "#000" }} />  {__("WebPart_FailedMessage")}</div>);
        }
        if (webinfos.length > 0) {
            return (<ul className="pp-simpleList spacing-m">
                {webinfos.map(webinfo => (
                    <li key={webinfo.Id}>
                        <h5><a href={webinfo.ServerRelativeUrl}>{webinfo.Title}</a></h5>
                        <div className="ms-metadata">{__("String_Created")} {Util.dateFormat(webinfo.Created)}</div>
                    </li>
                ))}
            </ul>);
        } else {
            return (<div className="ms-metadata">{__("WebPart_EmptyMessage")}</div>);
        }
    }

    /**
     * Fetch data (webinfos)
     */
    private fetchData = () => new Promise<IWebInfo[]>((resolve, reject) => {
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
                resolve(webinfos);
            }).catch(reject);
    })
};
