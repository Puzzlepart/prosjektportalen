import * as React from "react";
import RESOURCE_MANAGER from "../../Resources";
import * as unique from "array-unique";
import { DetailsList, IColumn, IGroup } from "office-ui-fabric-react/lib/DetailsList";
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
import { queryDeliveryElements } from "./DeliveriesOverviewSearch";

/**
 * Deliveries Overview SPA
 */
export default class DeliveriesOverview extends BaseWebPart<IDeliveriesOverviewProps, IDeliveriesOverviewState> {
    public static displayName = "DeliveriesOverview";
    public static defaultProps = DeliveriesOverviewDefaultProps;

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
        if (this.state.isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }

        const { items, groups } = this.getFilteredData();

        if (items.length === 0) {
            if (this.props.showEmptyMessage) {
                return <MessageBar>{RESOURCE_MANAGER.getResource("DeliveriesOverview_EmptyMessage")}</MessageBar>;
            }
            return null;
        }

        return (
            <div style={{ width: "100%" }}>
                {this.renderCommandBar(this.props, this.state)}
                <div hidden={!this.props.showSearchBox}>
                    <SearchBox
                        placeholder={RESOURCE_MANAGER.getResource("DeliveriesOverview_SearchBox_Placeholder")}
                        onChanged={st => this.setState({ searchTerm: st.toLowerCase() })} />
                </div>
                <DetailsList
                    items={items}
                    columns={this.props.columns}
                    groups={groups}
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
            const subItems = [{ ...noGrouping }, ...groupByOptions].map(item => ({
                ...item,
                onClick: e => {
                    e.preventDefault();
                    this.setState({ groupBy: item });
                },
            }));
            items.push({
                key: "Group",
                name: groupBy.name,
                iconProps: { iconName: "GroupedList" },
                itemType: ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                subMenuProps: { items: subItems },
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

    /**
     * Get filtered data based on groupBy and searchTerm (search is case-insensitive)
     */
    private getFilteredData(): { items: any[], groups: IGroup[] } {
        const { items, groupBy } = this.state;
        let groups: IGroup[] = null;
        if (groupBy.key !== "NoGrouping") {
            const groupItems = items.sort((a, b) => a[groupBy.key] > b[groupBy.key] ? -1 : 1);
            const groupNames = groupItems.map(g => g[groupBy.key]);
            groups = unique([].concat(groupNames)).map((name, idx) => ({
                key: idx,
                name: `${groupBy.name}: ${name}`,
                startIndex: groupNames.indexOf(name, 0),
                count: [].concat(groupNames).filter(n => n === name).length,
                isCollapsed: false,
                isShowingAll: true,
                isDropEnabled: false,
            }));
        }
        const filteredItems = this.state.items
            .filter(itm => {
                const matches = Object.keys(itm).filter(key => {
                    const value = itm[key];
                    return value && typeof value === "string" && value.toLowerCase().indexOf(this.state.searchTerm) !== -1;
                }).length;
                return matches > 0;
            })
            .sort((a, b) => a.Title > b.Title ? 1 : -1);
        return {
            items: filteredItems,
            groups: groups,
        };
    }

    /**
     * On render item column
     *
     * @param item The item
     * @param index The index
     * @param column The column
     */
    private _onRenderItemColumn = (item: any, index: number, column: IColumn, projectOnClick: (evt: any) => void): any => {
        let columnValue = item[column.fieldName];
        switch (column.key) {
            case "Title": {
                let dispFormUrl = item.Path;
                return (
                    <ModalLink
                        label={columnValue}
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
        }
        if (column.key.indexOf("OWSDATE") > -1) {
            return (
                <span>
                    {columnValue ? Util.dateFormat(columnValue, "LL") : null}
                </span>
            );
        }
        return <span title={columnValue}>{columnValue}</span>;
    }

    /**
     * Fetch data
     */
    private async fetchData(): Promise<Partial<IDeliveriesOverviewState>> {
        try {
            const items = await queryDeliveryElements(this.props.dataSource, this.props.columns.map(col => col.key));
            return { items };
        } catch (err) {
            throw err;
        }
    }

    /**
     * Export current view to Excel (xlsx)
     */
    private async exportToExcel() {
        this.setState({ excelExportStatus: ExcelExportStatus.Exporting });
        const { items } = this.getFilteredData();
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
