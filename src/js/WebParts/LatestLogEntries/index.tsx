import * as React from "react";
import RESOURCE_MANAGER from "localization";
import { Site } from "sp-pnp-js";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import ILatestLogEntriesProps, { LatestLogEntriesDefaultProps } from "./ILatestLogEntriesProps";
import ILatestLogEntriesState from "./ILatestLogEntriesState";
import BaseWebPart from "../@BaseWebPart";
import { ModalLink } from "../@Components";
import * as Util from "../../Util";

export default class LatestLogEntries extends BaseWebPart<ILatestLogEntriesProps, ILatestLogEntriesState> {
    public static displayName = "LatestLogEntries";
    public static defaultProps = LatestLogEntriesDefaultProps;

    private reloadInterval: number;

    /**
     * Constructor
     *
     * @param {ILatestLogEntriesProps} props Props
     */
    constructor(props: ILatestLogEntriesProps) {
        super(props, {
            isLoading: true,
        });
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        this.fetchData(this.props)
            .then(data => {
                this.setState({
                    ...data,
                    isLoading: false,
                });
            })
            .catch(_ => this.setState({ isLoading: false }));

        if (this.props.reloadInterval !== -1) {
            this.reloadInterval = window.setInterval(() => {
                this.fetchData(this.props)
                    .then(data => {
                        this.setState(data);
                    });
            }, (this.props.reloadInterval * 1000));
        }

        /**
         * Checks if the web part should be rendered for the current user
         */
        Util.doesUserMatchAudience(this.props.audienceTargeting).then(userMatchAudience => {
            if (userMatchAudience !== this.state.shouldRender) {
                this.setState({
                    shouldRender: userMatchAudience,
                });
            }
        });
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
        if (!this.state.shouldRender) {
            return null;
        }
        return (
            <div>
                {this.__renderChrome(RESOURCE_MANAGER.getResource("WebPart_LatestLogEntries_Title"), `#${this.props.containerId}`, LatestLogEntries.displayName)}
                {this.renderItems(this.props, this.state)}
            </div>
        );
    }

    /**
     * Render items
    *
    * @param {ILatestLogEntriesProps} param0 Props
    * @param {ILatestLogEntriesState} param1 State
     */
    private renderItems = ({ containerId, listClassName }: ILatestLogEntriesProps, { isLoading, entries, forms }: ILatestLogEntriesState) => {
        if (isLoading) {
            return (
                <Spinner type={SpinnerType.large} />
            );
        } else if (entries.length > 0) {
            return (
                <div id={containerId}>
                    <ul className={listClassName}>
                        {entries.map((entry, key) => (
                            <li key={key}>
                                <div>
                                    <h5>
                                        <ModalLink
                                            icon={{ iconName: this.getEntryIcon(entry.LogLevel) }}
                                            style={{ color: this.getEntryColor(entry.LogLevel) }}
                                            label={entry.Created}
                                            url={this.getDisplayFormUrl(entry.ID)}
                                            options={{ HideRibbon: true }} />
                                    </h5>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div id={containerId}>
                    <MessageBar>{RESOURCE_MANAGER.getResource("WebPart_EmptyMessage")}</MessageBar>
                </div>
            );
        }
    }

    /**
     * Get icon for log entry
     *
     * @param {any} logLevel Log level
     */
    private getEntryIcon(logLevel): string {
        switch (logLevel) {
            case RESOURCE_MANAGER.getResource("String_LogLevel_Error"): {
                return "Error";
            }
            case RESOURCE_MANAGER.getResource("String_LogLevel_Info"): {
                return "Info";
            }
            case RESOURCE_MANAGER.getResource("String_LogLevel_Warning"): {
                return "Warning";
            }
            default: {
                return "";
            }
        }
    }

    /**
     * Get color for log entry
     *
     * @param {any} logLevel Log level
     */
    private getEntryColor(logLevel): string {
        switch (logLevel) {
            case RESOURCE_MANAGER.getResource("String_LogLevel_Error"): {
                return "#ea5c73";
            }
            case RESOURCE_MANAGER.getResource("String_LogLevel_Info"): {
                return "#035484";
            }
            case RESOURCE_MANAGER.getResource("String_LogLevel_Warning"): {
                return "#e9b359";
            }
            default: {
                return "";
            }
        }
    }

    /**
     * Get display form url for the specified item ID
     *
     * @param {string} itemId Item ID
     */
    private getDisplayFormUrl(itemId: string): string {
        const [dispForm] = this.state.forms.filter(f => f.FormType === 4);
        const dispFormUrl = `${dispForm.ServerRelativeUrl}?ID=${itemId}`;
        return dispFormUrl;
    }

    /**
     * Fetch log entries
    *
    * @param {ILatestLogEntriesProps} param0 Props
    */
    private fetchData = ({ itemsCount, itemsOrderBy }: ILatestLogEntriesProps) => new Promise<Partial<ILatestLogEntriesState>>((resolve, reject) => {
        const logList = new Site(_spPageContextInfo.siteAbsoluteUrl)
            .rootWeb
            .lists
            .getByTitle(RESOURCE_MANAGER.getResource("Lists_Log_Title"));
        Promise.all([
            logList
                .items
                .top(itemsCount)
                .orderBy(itemsOrderBy.orderBy, itemsOrderBy.ascending)
                .expand("FieldValuesAsHtml")
                .get(),
            logList
                .forms
                .get(),
        ]).then(([entries, forms]) => {
            resolve({
                entries: entries.map(e => e.FieldValuesAsHtml),
                forms,
            });
        })
            .catch(reject);
    })
}
