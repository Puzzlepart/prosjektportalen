//#region Imports
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
import * as Data from "./BenefitsOverviewData";
import IBenefitsOverviewProps, { BenefitsOverviewDefaultProps } from "./IBenefitsOverviewProps";
import IBenefitsOverviewState from "./IBenefitsOverviewState";
import BaseWebPart from "../@BaseWebPart";
import ExportToExcel, { ExcelExportStatus } from "../../Util/ExportToExcel";
import * as Util from "../../Util";
import { BenefitMeasurementIndicator } from "./BenefitsOverviewData/BenefitMeasurementIndicator";
import BenefitMeasurementsModal from "./BenefitMeasurementsModal";
import * as objectGet from "object-get";
import { GetColumns } from "./BenefitsOverviewColumns";
import { BenefitsOverviewCustomRenderFunction } from "./BenefitsOverviewCustomRenderFunction";
//#endregion

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
        const items = await Data.fetchData(this.props.queryTemplate, this.props.dataSourceName);
        this.setState({ data: { items, columns: GetColumns(this.props.showSiteTitleColumn) }, isLoading: false });
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
                    <div hidden={!this.props.showSearchBox} style={{ margin: "5px 0 5px 0" }}>
                        <SearchBox
                            onChange={st => this.setState({ searchTerm: st.toLowerCase() })}
                            placeholder={__.getResource("BenefitsOverview_SearchBox_Placeholder")} />
                    </div>
                    <div>
                        <DetailsList
                            items={items}
                            columns={columns}
                            groups={groups}
                            selectionMode={SelectionMode.none}
                            onRenderItemColumn={this.onRenderItemColumn}
                            onColumnHeaderClick={this.onColumnHeaderClick} />
                    </div>
                    {this.state.showMeasurements && <BenefitMeasurementsModal indicator={this.state.showMeasurements} onDismiss={_ => this.setState({ showMeasurements: null })} />}
                    {this.state.selectedProject && this.renderProjectInfoModal(this.props, this.state)}
                </div>
            );
        }
        return null;
    }

    @autobind
    private onRenderItemColumn(item: BenefitMeasurementIndicator, _index: number, column: IColumn) {
        const onCustomRender: BenefitsOverviewCustomRenderFunction = objectGet(column, "data.onCustomRender");
        const fieldNameDisplay: string = objectGet(column, "data.fieldNameDisplay");

        if (typeof onCustomRender === "function") {
            return onCustomRender(item, column, {
                siteTitle: (_item) => this.setState({ selectedProject: _item }),
                allMeasurements: (_item) => this.setState({ showMeasurements: _item as BenefitMeasurementIndicator }),
            });
        }
        return objectGet(item, fieldNameDisplay || column.fieldName);
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
            return (
                <div hidden={!showCommandBar}>
                    <CommandBar items={items} farItems={farItems} />
                </div>
            );
        }
        return null;
    }

    /**
     * Renders the Project Info modal
     *
     * @param {IBenefitsOverviewProps} param0 Props
     * @param {IBenefitsOverviewState} param1 State
     */
    private renderProjectInfoModal({ modalHeaderClassName, projectInfoFilterField }: IBenefitsOverviewProps, { selectedProject }: IBenefitsOverviewState) {
        return (
            <ProjectInfo
                webUrl={selectedProject.webUrl}
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
                    onDismiss: _event => this.setState({ selectedProject: null }),
                    headerClassName: modalHeaderClassName,
                    headerStyle: { marginBottom: 20 },
                    title: selectedProject.siteTitle,
                }} />
        );
    }

    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
     *
     * @param {IBenefitsOverviewProps} param0 Props
     * @param {IBenefitsOverviewState} param1 State
     */
    private getFilteredData({ }: IBenefitsOverviewProps, { groupBy, data, searchTerm }: IBenefitsOverviewState): { items: BenefitMeasurementIndicator[], columns: IColumn[], groups: IGroup[] } {
        let columns = [].concat(data.columns);
        let groups: IGroup[] = null;
        if (groupBy.key !== "NoGrouping") {
            let itemsSorted = data.items.sort((a, b) => objectGet(a, groupBy.key) > objectGet(b, groupBy.key) ? -1 : 1);
            const groupNames = itemsSorted.map(g => g[groupBy.key] as string);
            groups = (unique([].concat(groupNames)) as string[]).map((name, idx) => {
                const count = [].concat(groupNames).filter(n => n === name).length;
                return {
                    key: `Group_${idx}`,
                    name: `${groupBy.name}: ${name}`,
                    startIndex: groupNames.indexOf(name, 0),
                    count,
                    isCollapsed: false,
                    isShowingAll: count === items.length,
                    isDropEnabled: false,
                };
            });
        }
        const items = data.items.filter(item => item.title.toLowerCase().indexOf(searchTerm) !== -1);
        return { items, columns, groups };
    }

    /**
     * Sorting on column click
     *
     * @param {React.MouseEvent} _event Event
     * @param {IColumn} column Column
     */
    @autobind
    private onColumnHeaderClick(_event: React.MouseEvent<any>, column: IColumn): any {
        const { data } = this.state;

        let isSortedDescending = column.isSortedDescending;
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }
        let items = data.items.concat([]).sort((a, b) => {
            let aValue = objectGet(a, column.fieldName);
            let bValue = objectGet(b, column.fieldName);
            return isSortedDescending ? (aValue > bValue ? -1 : 1) : (aValue > bValue ? 1 : -1);
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
        const fileName = String.format(this.props.excelExportConfig.fileName, __.getResource("BenefitsOverview_ExcelExportFileNamePrefix"), Util.dateFormat(new Date().toISOString(), "YYYY-MM-DD-HH-mm"));
        const sheets = [];
        let { items, columns } = this.getFilteredData(this.props, this.state);
        let _columns = columns.filter(column => column.name);
        sheets.push({
            name: this.props.excelExportConfig.sheetName,
            data: [
                _columns.map(column => column.name),
                ...items.map(item => _columns.map(column => objectGet(item, column.fieldName))),
            ],
        });
        await ExportToExcel({ sheets, fileName });
        this.setState({ excelExportStatus: ExcelExportStatus.Idle });
    }
}

export { IBenefitsOverviewProps, IBenefitsOverviewState };
