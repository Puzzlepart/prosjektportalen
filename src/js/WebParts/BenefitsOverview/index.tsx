import * as React from "react";
import __ from "../../Resources";
import * as unique from "array-unique";
import { DetailsList, IGroup, SelectionMode, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { CommandBar, ICommandBarItemProps } from "office-ui-fabric-react/lib/CommandBar";
import { ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import ProjectInfo, { ProjectInfoRenderMode } from "../ProjectInfo";
import { onRenderItemColumn } from "./BenefitsOverviewData/BenefitsOverviewDataColumns";
import * as Data from "./BenefitsOverviewData";
import IBenefitsOverviewProps, { BenefitsOverviewDefaultProps } from "./IBenefitsOverviewProps";
import IBenefitsOverviewState from "./IBenefitsOverviewState";
import BaseWebPart from "../@BaseWebPart";
import ExportToExcel, { ExcelExportStatus } from "../../Util/ExportToExcel";
import * as Util from "../../Util";
import { BenefitMeasurementIndicator } from "./BenefitsOverviewData/BenefitMeasurementIndicator";
import BenefitMeasurementsModal from "./BenefitMeasurementsModal";

/**
 * Benefits Overview
 */
export default class BenefitsOverview extends BaseWebPart<IBenefitsOverviewProps, IBenefitsOverviewState> {
    public static displayName = "BenefitsOverview";
    public static defaultProps = BenefitsOverviewDefaultProps;

    /**
     * Constructor
     *
     * @param {IBenefitsOverviewProps} props Props
     */
    constructor(props: IBenefitsOverviewProps) {
        super(props, {
            isLoading: true,
            searchTerm: "",
            groupBy: { key: "NoGrouping", name: __.getResource("String_NoGrouping") },
        });
    }

    public async componentDidMount(): Promise<void> {
        const data = await Data.fetchData(this.props.queryTemplate, this.props.showSiteTitleColumn, this.props.dataSourceName);
        this.setState({ data: data, isLoading: false });
    }

    /**
     * Render the <BenefitsOverview /> component
     */
    public render(): JSX.Element {
        if (this.state.isLoading) {
            return (
                <Spinner
                    type={SpinnerType.large}
                    label={__.getResource("BenefitsOverview_LoadingText")} />
            );
        }
        if (this.state.data) {
            let { items, columns, groups } = this.getFilteredData(this.props, this.state);
            return (
                <div style={{ width: "100%" }}>
                    {this.renderCommandBar(this.props, this.state)}
                    <div hidden={!this.props.showSearchBox}>
                        <SearchBox
                            onChange={st => this.setState({ searchTerm: st.toLowerCase() })}
                            placeholder={__.getResource("BenefitsOverview_SearchBox_Placeholder")} />
                    </div>
                    <DetailsList
                        items={items}
                        columns={columns}
                        groups={groups}
                        selectionMode={SelectionMode.none}
                        onRenderItemColumn={this.onRenderItemColumn}
                        onColumnHeaderClick={(column, evt) => this.onColumnClick(column, evt)}
                    />
                    {this.state.showMeasurements && (
                        <BenefitMeasurementsModal
                            indicator={this.state.showMeasurements}
                            onDismiss={_ => this.setState({ showMeasurements: null })} />
                    )}
                    {this.renderProjectInfoModal(this.props, this.state)}
                </div>
            );
        }
        return null;
    }

    @autobind
    private onRenderItemColumn(item: BenefitMeasurementIndicator, index: number, column: IColumn) {
        let _openProjectInfoCallback = (event: React.MouseEvent<any>) => {
            event.preventDefault();
            this.setState({ showProjectInfo: item });
        };
        let _openMeasurementsCallback = (_item: BenefitMeasurementIndicator) => { this.setState({ showMeasurements: _item }); };

        return onRenderItemColumn(item, index, column, _openProjectInfoCallback, _openMeasurementsCallback);
    }


    /**
     * Renders the command bar from office-ui-fabric-react
     *
     * @param {IBenefitsOverviewProps} param0 Props
     * @param {IBenefitsOverviewState} param1 State
     */
    private renderCommandBar = ({ groupByOptions, showCommandBar }: IBenefitsOverviewProps, { groupBy }: IBenefitsOverviewState) => {
        const items: Array<ICommandBarItemProps> = [];
        const farItems: Array<ICommandBarItemProps> = [];

        if (groupByOptions.length > 0) {
            const noGrouping = {
                key: "NoGrouping",
                name: __.getResource("String_NoGrouping"),
            };
            const subItems = [{ ...noGrouping }, ...groupByOptions].map(item => ({
                ...item,
                onClick: (event: any) => {
                    event.preventDefault();
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
            return <CommandBar hidden={!showCommandBar} items={items} farItems={farItems} />;
        }
        return null;
    }

    /**
     * Renders the Project Info modal
     *
     * @param {IBenefitsOverviewProps} param0 Props
     * @param {IBenefitsOverviewState} param1 State
     */
    private renderProjectInfoModal = ({ modalHeaderClassName, projectInfoFilterField }: IBenefitsOverviewProps, { showProjectInfo }: IBenefitsOverviewState) => {
        if (showProjectInfo) {
            return (
                <ProjectInfo
                    webUrl={showProjectInfo.webUrl}
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
                        onDismiss: _event => this.setState({ showProjectInfo: null }),
                        headerClassName: modalHeaderClassName,
                        headerStyle: { marginBottom: 20 },
                        title: showProjectInfo.siteTitle,
                    }} />
            );
        }
        return null;
    }

    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
     *
     * @param {IBenefitsOverviewProps} param0 Props
     * @param {IBenefitsOverviewState} param1 State
     */
    private getFilteredData({ searchProperty }: IBenefitsOverviewProps, { groupBy, data, searchTerm }: IBenefitsOverviewState): { items: any[], columns: any[], groups: IGroup[] } {
        let columns = [].concat(data.columns);
        let groups: IGroup[] = null;
        if (groupBy.key !== "NoGrouping") {
            const groupItems = data.items.sort((a, b) => a[groupBy.key] > b[groupBy.key] ? -1 : 1);
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
        const filteredItems = data.items.filter(item => item[searchProperty].toLowerCase().indexOf(searchTerm) !== -1);
        return {
            items: filteredItems,
            columns: columns,
            groups: groups,
        };
    }

    /**
     * Sorting on column click
     *
     * @param {React.MouseEvent} event Event
     * @param {IColumn} column Column
     */
    @autobind
    private onColumnClick(_event: React.MouseEvent<any>, column: IColumn): any {
        const { data } = this.state;

        let isSortedDescending = column.isSortedDescending;
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }
        let items = data.items.concat([]).sort((a, b) => {
            let firstValue = a[column.fieldName];
            let secondValue = b[column.fieldName];
            if (isSortedDescending) {
                return firstValue > secondValue ? -1 : 1;
            } else {
                return firstValue > secondValue ? 1 : -1;
            }
        });
        let columns = data.columns.map(_column => {
            _column.isSorted = (_column.key === column.key);
            if (_column.isSorted) {
                _column.isSortedDescending = isSortedDescending;
            }
            return _column;
        });
        this.setState({ data: { items, columns } });
    }

    /**
     * Export current view to Excel (xlsx)
     */
    private async exportToExcel() {
        this.setState({ excelExportStatus: ExcelExportStatus.Exporting });
        let { items, columns } = this.getFilteredData(this.props, this.state);
        const sheet = {
            name: this.props.excelExportConfig.sheetName,
            data: [
                columns.map(column => column.name),
                ...items.map(item => columns.map(column => item[column.fieldName])),
            ],
        };
        const fileName = String.format(this.props.excelExportConfig.fileName, __.getResource("BenefitsOverview_ExcelExportFileNamePrefix"), Util.dateFormat(new Date().toISOString(), "YYYY-MM-DD-HH-mm"));
        await ExportToExcel({ sheets: [sheet], fileName });
        this.setState({ excelExportStatus: ExcelExportStatus.Idle });
    }
}

export { IBenefitsOverviewProps, IBenefitsOverviewState };
