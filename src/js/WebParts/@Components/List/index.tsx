import * as React from "react";
import * as unique from "array-unique";
import __ from "../../../Resources";
import { DetailsList, IColumn, IGroup, SelectionMode, DetailsListLayoutMode, ConstrainMode } from "office-ui-fabric-react/lib/DetailsList";
import { CommandBar, ICommandBarItemProps } from "office-ui-fabric-react/lib/CommandBar";
import { ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import ProjectInfo, { ProjectInfoRenderMode } from "../../ProjectInfo";
import ModalLink from "../ModalLink";
import IListProps from "./IListProps";
import IListState from "./IListState";
import ExportToExcel, { ExcelExportStatus } from "../../../Util/ExportToExcel";
import * as Util from "../../../Util";

export default class List extends React.PureComponent<IListProps, IListState> {
    public static defaultProps: Partial<IListProps> = {
        pathKey: "Path",
        webUrlKey: "SPWebUrl",
        defaultGroupBy: { key: "NoGrouping", name: __.getResource("String_NoGrouping") },
    };

    /**
     * Constructor
     *
     * @param {IListProps} props Props
     */
    constructor(props: IListProps) {
        super(props);
        this.state = {
            searchTerm: "",
            groupBy: props.defaultGroupBy,
        };
    }

    /**
     * Renders the <List /> component
     */
    public render(): React.ReactElement<IListProps> {
        let { items, columns, groups } = this._getFilteredData();
        return (
            <div>
                {this._renderCommandBar()}
                <div hidden={!this.props.showSearchBox}>
                    <SearchBox
                        placeholder={__.getResource("ExperienceLog_SearchBox_Placeholder")}
                        onChanged={this._onSearch} />
                </div>
                <DetailsList
                    items={items}
                    columns={columns}
                    groups={groups}
                    onRenderItemColumn={this._onRenderItemColumn}
                    constrainMode={ConstrainMode.horizontalConstrained}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    selectionMode={SelectionMode.none} />
                {this._renderProjectInfoModal()}
            </div>
        );
    }

    /**
     * Renders command bar
     */
    private _renderCommandBar() {
        const items: Array<ICommandBarItemProps> = [];
        const farItems: Array<ICommandBarItemProps> = [];

        if (this.props.groupByOptions && this.props.groupByOptions.length > 0) {
            const noGrouping = {
                key: "NoGrouping",
                name: __.getResource("String_NoGrouping"),
            };
            const subItems = [noGrouping, ...this.props.groupByOptions].map(item => ({
                ...item,
                onClick: e => {
                    e.preventDefault();
                    this.setState({ groupBy: item });
                },
            }));
            items.push({
                key: "Group",
                name: this.state.groupBy.name,
                iconProps: { iconName: "GroupedList" },
                itemType: ContextualMenuItemType.Header,
                onClick: evt => evt.preventDefault(),
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
                onClick: evt => {
                    evt.preventDefault();
                    this._exportToExcel();
                },
            });
        }

        if (items.length > 0 || farItems.length > 0) {
            return (
                <CommandBar
                    hidden={!this.props.showCommandBar}
                    items={items}
                    farItems={farItems}
                />
            );
        }
        return null;
    }

    /**
     * On render item column
     *
     * @param {any} item The item
     * @param {number} index The index
     * @param {IColumn} column The column
     */
    @autobind
    private _onRenderItemColumn(item: any, index: number, column: IColumn) {
        let colValue = item[column.fieldName];
        switch (column.key) {
            case "Title": {
                const path = item[this.props.pathKey];
                if (path) {
                    return (
                        <ModalLink
                            label={colValue}
                            url={path}
                            options={{ HideRibbon: true }} />
                    );
                } else {
                    return colValue;
                }
            }
            case "SiteTitle": {
                const webUrl = item[this.props.webUrlKey];
                if (webUrl) {
                    return <a href={webUrl} onClick={(e) => {e.preventDefault(); this._openProject(item); }}>{colValue}</a>;
                }
                return colValue;
            }
            default: {
                if (Array.isArray(colValue)) {
                    return (
                        <ul style={{ margin: 0, padding: 0 }}>
                            {(colValue as string[]).map((v, idx) => <li key={idx}>{v}</li>)}
                        </ul>
                    );
                }
                if (column.key.indexOf("OWSDATE") > -1) {
                    return <span>{colValue ? Util.dateFormat(colValue, "LL") : null}</span>;
                }
                return colValue;
            }
        }
    }

    /**
     * Open project in modal
     *
     * @param {any} project The project
     */
    private _openProject(project: any) {
        this.setState({ showProjectInfo: project });
    }

    /**
     * Dismiss project modal
     */
    @autobind
    private _dismissProjectInfoModal() {
        this.setState({ showProjectInfo: null });
    }

    /**
     * On search
     *
     * @param {string} searchTerm Search term
     */
    @autobind
    private _onSearch(searchTerm: any) {
        this.setState({ searchTerm: searchTerm.toLowerCase() });
    }

    /**
     * Renders the Project Info modal
     */
    private _renderProjectInfoModal() {
        const { showProjectInfo } = this.state;
        if (showProjectInfo) {
            return (
                <ProjectInfo
                    webUrl={showProjectInfo.SPWebUrl}
                    hideChrome={true}
                    showActionLinks={false}
                    showMissingPropsWarning={false}
                    filterField={"GtPcPortfolioPage"}
                    labelSize="l"
                    valueSize="m"
                    renderMode={ProjectInfoRenderMode.Modal}
                    modalOptions={{
                        isOpen: true,
                        isDarkOverlay: true,
                        isBlocking: false,
                        onDismiss: this._dismissProjectInfoModal,
                        headerClassName: "ms-font-xxl",
                        headerStyle: { marginBottom: 20 },
                        title: showProjectInfo.SiteTitle,
                    }} />
            );
        }
        return null;
    }

    /**
     * Get filtered data based on groupBy and searchTerm (search is case-insensitive)
     */
    private _getFilteredData(): { items: any[], columns: any[], groups: IGroup[] } {
        let items = [].concat(this.props.items).filter(itm => {
            const matches = Object.keys(itm).filter(key => {
                const value = itm[key];
                return value && typeof value === "string" && value.toLowerCase().indexOf(this.state.searchTerm) !== -1;
            }).length;
            return matches > 0;
        });
        let columns = [].concat(this.props.columns);
        let groups: IGroup[] = null;
        if (this.state.groupBy.key !== "NoGrouping") {
            items = items.sort((a, b) => a[this.state.groupBy.key] > b[this.state.groupBy.key] ? -1 : 1);
            const groupNames = items.map(g => g[this.state.groupBy.key]);
            groups = unique([].concat(groupNames)).map((name, idx) => ({
                key: idx,
                name: `${this.state.groupBy.name}: ${name}`,
                startIndex: groupNames.indexOf(name, 0),
                count: [].concat(groupNames).filter(n => n === name).length,
                isCollapsed: false,
                isShowingAll: true,
                isDropEnabled: false,
            }));
        }
        return { items, columns, groups };
    }

    /**
     * Export to Excel
     */
    private async _exportToExcel() {
        const { excelExportConfig } = this.props;
        this.setState({ excelExportStatus: ExcelExportStatus.Exporting });
        let { items, columns } = this._getFilteredData();
        const sheet = {
            name: excelExportConfig.sheetName,
            data: [
                columns.map(col => col.name),
                ...items.map(item => columns.map(col => item[col.fieldName])),
            ],
        };
        const fileName = String.format("{0}-{1}.xlsx", excelExportConfig.fileNamePrefix, Util.dateFormat(new Date().toISOString(), "YYYY-MM-DD-HH-mm"));
        await ExportToExcel({ sheets: [sheet], fileName });
        this.setState({ excelExportStatus: ExcelExportStatus.Idle });
    }
}

export {
    IListProps,
    IListState,
};
