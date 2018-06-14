import * as React from "react";
import RESOURCE_MANAGER from "../../Resources";
import pnp, { Site, List } from "sp-pnp-js";
import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { ModalLink } from "../../WebParts/@Components";
import BaseWebPart from "../@BaseWebPart";
import ExportToExcel, { ExcelExportStatus } from "../../Util/ExportToExcel";
import ProjectInfo, { ProjectInfoRenderMode } from "../ProjectInfo";
import * as Util from "../../Util";
import IDeliveriesOverviewProps, { DeliveriesOverviewDefaultProps } from "./IDeliveriesOverviewProps";
import IDeliveriesOverviewState from "./IDeliveriesOverviewState";
import DeliveryElement from "./DeliveryElement";

/**
 * Deliveries Overview SPA
 */
export default class DeliveriesOverview extends BaseWebPart<IDeliveriesOverviewProps, IDeliveriesOverviewState> {
    public static displayName = "DeliveriesOverview";
    public static defaultProps = DeliveriesOverviewDefaultProps;
    private _dataSourcesList: List;

    /**
     * Constructor
     *
     * @param {IDeliveriesOverviewProps} props Props
     */
    constructor(props: IDeliveriesOverviewProps) {
        super(props, {
            isLoading: true,
            searchTerm: "",
            groupBy: {
                key: "NoGrouping",
                name: RESOURCE_MANAGER.getResource("String_NoGrouping"),
            },
        });
        this._dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_DataSources_Title"));
    }

    /**
    * Component did mount
    */
    public async componentDidMount(): Promise<void> {
        try {
            const data = await this.fetchData();
            this.setState({
                ...data,
                isLoading: false,
            });
        } catch (err) {
            this.setState({ items: [], isLoading: false });
        }
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const { items, isLoading } = this.state;
        const { showSearchBox } = this.props;

        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }

        if (items.length === 0) {
            if (this.props.showEmptyMessage) {
                return <MessageBar>{RESOURCE_MANAGER.getResource("RiskMatrix_EmptyMessage")}</MessageBar>;
            }
            return null;
        }


        return (
            <div style={{ width: "100%" }}>
                {this.renderCommandBar(this.props, this.state)}
                <div hidden={!showSearchBox}>
                    <SearchBox
                        placeholder={RESOURCE_MANAGER.getResource("DeliveriesOverview_SearchBox_Placeholder")}
                        onChanged={st => this.setState({ searchTerm: st.toLowerCase() })} />
                </div>
                <DetailsList
                    items={this.getFilteredItems()}
                    columns={this.props.columns}
                    onRenderItemColumn={(item, index, column: any) => {
                        return this._onRenderItemColumn(item, index, column, (evt) => {
                            evt.preventDefault();
                            this.setState({ showProjectInfo: item });
                        });
                    }}
                    constrainMode={this.props.constrainMode}
                    layoutMode={this.props.layoutMode}
                    selectionMode={this.props.selectionMode}
                    />
                {this.renderProjectInfoModal(this.props, this.state)}
            </div>
        );
    }

    /**
     * Renders the Project Info modal
     *
     * @param {IDeliveriesOverviewProps} param0 Props
     * @param {IDeliveriesOverviewState} param1 State
     */
    private renderProjectInfoModal = ({ modalHeaderClassName, projectInfoFilterField }: IDeliveriesOverviewProps, { showProjectInfo }: IDeliveriesOverviewState) => {
        if (showProjectInfo) {
            return (
                <ProjectInfo
                    webUrl={showProjectInfo.SPWebUrl}
                    hideChrome={true}
                    showActionLinks={false}
                    showMissingPropsWarning={false}
                    filterField={projectInfoFilterField}
                    labelSize="l"
                    valueSize="m"
                    renderMode={ProjectInfoRenderMode.Modal}
                    modalOptions={{
                        isOpen: true,
                        isDarkOverlay: true,
                        isBlocking: false,
                        onDismiss: e => this.setState({ showProjectInfo: null }),
                        headerClassName: modalHeaderClassName,
                        headerStyle: { marginBottom: 20 },
                        title: showProjectInfo.SiteTitle,
                    }} />
            );
        }
        return null;
    }
    /**
     * Renders the command bar from office-ui-fabric-react
     *
     * @param {IDeliveriesOverviewProps} param0 Props
     * @param {IDeliveriesOverviewState} param1 State
     */
    private renderCommandBar = ({ groupByOptions, showCommandBar }: IDeliveriesOverviewProps, { groupBy }: IDeliveriesOverviewState) => {
        const items = [];
        const farItems = [];

        if (groupByOptions.length > 0) {
            const noGrouping = {
                key: "NoGrouping",
                name: RESOURCE_MANAGER.getResource("String_NoGrouping"),
            };
            items.push({
                key: "Group",
                name: groupBy.name,
                iconProps: { iconName: "GroupedList" },
                itemType: ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                items: [
                    {
                        ...noGrouping,
                    },
                    ...groupByOptions,
                ].map(item => ({
                    ...item,
                    onClick: e => {
                        e.preventDefault();
                        this.setState({ groupBy: item });
                    },
                })),
            });
        }

        if (this.props.excelExportEnabled && this.props.excelExportConfig) {
            items.push({
                key: "ExcelExport",
                name: this.props.excelExportConfig.buttonLabel,
                iconProps: {
                    iconName: this.props.excelExportConfig.buttonIcon,
                    styles: { root: { color: "green !important" } },
                },
                disabled: this.state.excelExportStatus === ExcelExportStatus.Exporting,
                onClick: e => {
                    e.preventDefault();
                    this.exportToExcel();
                },
            });
        }

        if (items.length > 0 || farItems.length > 0) {
            return (
                <CommandBar
                    hidden={!showCommandBar}
                    items={items}
                    farItems={farItems}
                />
            );
        }
        return null;
    }

    private getFilteredItems() {
        return this.state.items
            .filter(itm => {
                const matches = Object.keys(itm).filter(key => {
                    const value = itm[key];
                    return value && typeof value === "string" && value.toLowerCase().indexOf(this.state.searchTerm) !== -1;
                }).length;
                return matches > 0;
            })
            .sort((a, b) => a.Title > b.Title ? 1 : -1);
    }

    /**
     * On render item column
     *
     * @param item The item
     * @param index The index
     * @param column The column
     */
    private _onRenderItemColumn = (item: any, index: number, column: IColumn, projectOnClick: (evt: any) => void): any => {
        let colValue = item[column.fieldName];
        switch (column.key) {
            case "Title": {
                let dispFormUrl = item.Path;
                return (
                    <ModalLink
                        label={colValue}
                        url={dispFormUrl}
                        options={{ HideRibbon: true }} />
                );
            }
            case "SiteTitle": {
                return (
                    <a
                    href={item.SPWebUrl}
                    onClick={projectOnClick}>{item.SiteTitle}</a>
                );
            }
            default: {
                return colValue;
            }
        }
    }

    /**
     * Fetch data using sp-pnp-js search
     */
    private async fetchData(): Promise<Partial<IDeliveriesOverviewState>> {
        let { items } = this.state;

        if (!items) {
            items = [];
        }
        try {
            if (this.props.dataSource) {
                const spSearchItems = await this._fetchFromDataSource(this.props.dataSource);
                items = spSearchItems.map(item => {
                    return new DeliveryElement(item);
                });
            }
            return { items };
        } catch (err) {
            throw err;
        }
    }

    /**
    * Fetch data from data source
    *
    * @param {string} name Data source name
    */
   private async _fetchFromDataSource(name: string): Promise<Array<any>> {
    const [dataSource] = await this._dataSourcesList.items.filter(`Title eq '${name}'`).get();
    if (dataSource) {
        const searchResults = await pnp.sp.search({
            Querytext: "*",
            RowLimit: this.props.rowLimit,
            TrimDuplicates: false,
            SelectProperties: [
                "ListItemID",
                "Path",
                "WebId",
                "Title",
                "SiteTitle",
            ],
            QueryTemplate: dataSource.GtDpSearchQuery,
        });
        return searchResults.PrimarySearchResults;
    } else {
        return [];
    }
}
    /**
     * Export current view to Excel (xlsx)
     */
    private async exportToExcel() {
        this.setState({ excelExportStatus: ExcelExportStatus.Exporting });
        const items = this.getFilteredItems();
        const sheet = {
            name: this.props.excelExportConfig.sheetName,
            data: [
                this.props.columns.map(col => col.name),
                ...items.map(item => this.props.columns.map(col => item[col.fieldName])),
            ],
        };
        const fileName = String.format(this.props.excelExportConfig.fileName, RESOURCE_MANAGER.getResource("DeliveriesOverview_ExcelExportFileNamePrefix"), Util.dateFormat(new Date().toISOString(), "YYYY-MM-DD-HH-mm"));
        await ExportToExcel({
            sheets: [sheet],
            fileName,
        });
        this.setState({ excelExportStatus: ExcelExportStatus.Idle });
    }
}

export {
    IDeliveriesOverviewProps,
    IDeliveriesOverviewState,
};
