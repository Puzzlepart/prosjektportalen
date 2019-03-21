"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../Resources");
const unique = require("array-unique");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
const ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
const SearchBox_1 = require("office-ui-fabric-react/lib/SearchBox");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
const ProjectInfo_1 = require("../ProjectInfo");
const BenefitsOverviewDataColumns_1 = require("./BenefitsOverviewData/BenefitsOverviewDataColumns");
const Data = require("./BenefitsOverviewData");
const IBenefitsOverviewProps_1 = require("./IBenefitsOverviewProps");
const _BaseWebPart_1 = require("../@BaseWebPart");
const ExportToExcel_1 = require("../../Util/ExportToExcel");
const Util = require("../../Util");
const BenefitMeasurementsModal_1 = require("./BenefitMeasurementsModal");
/**
 * Benefits Overview
 */
class BenefitsOverview extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IBenefitsOverviewProps} props Props
     */
    constructor(props) {
        super(props, {
            isLoading: true,
            searchTerm: "",
            groupBy: { key: "NoGrouping", name: Resources_1.default.getResource("String_NoGrouping") },
        });
        /**
         * Renders the command bar from office-ui-fabric-react
         *
         * @param {IBenefitsOverviewProps} param0 Props
         * @param {IBenefitsOverviewState} param1 State
         */
        this.renderCommandBar = ({ groupByOptions, showCommandBar }, { groupBy }) => {
            const items = [];
            const farItems = [];
            if (groupByOptions.length > 0) {
                const noGrouping = {
                    key: "NoGrouping",
                    name: Resources_1.default.getResource("String_NoGrouping"),
                };
                const subItems = [Object.assign({}, noGrouping), ...groupByOptions].map(item => (Object.assign({}, item, { onClick: (event) => {
                        event.preventDefault();
                        this.setState({ groupBy: item });
                    } })));
                items.push({
                    key: "Group",
                    name: groupBy.name,
                    iconProps: { iconName: "GroupedList" },
                    itemType: ContextualMenu_1.ContextualMenuItemType.Header,
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
                    disabled: this.state.excelExportStatus === ExportToExcel_1.ExcelExportStatus.Exporting,
                    onClick: e => {
                        e.preventDefault();
                        this.exportToExcel();
                    },
                });
            }
            if (items.length > 0 || farItems.length > 0) {
                return React.createElement(CommandBar_1.CommandBar, { hidden: !showCommandBar, items: items, farItems: farItems });
            }
            return null;
        };
        /**
         * Renders the Project Info modal
         *
         * @param {IBenefitsOverviewProps} param0 Props
         * @param {IBenefitsOverviewState} param1 State
         */
        this.renderProjectInfoModal = ({ modalHeaderClassName, projectInfoFilterField }, { showProjectInfo }) => {
            if (showProjectInfo) {
                return (React.createElement(ProjectInfo_1.default, { webUrl: showProjectInfo.webUrl, hideChrome: true, showActionLinks: false, showMissingPropsWarning: false, filterField: projectInfoFilterField, labelSize: "l", valueSize: "m", renderMode: ProjectInfo_1.ProjectInfoRenderMode.Modal, modalOptions: {
                        isOpen: true,
                        isDarkOverlay: true,
                        isBlocking: false,
                        onDismiss: _event => this.setState({ showProjectInfo: null }),
                        headerClassName: modalHeaderClassName,
                        headerStyle: { marginBottom: 20 },
                        title: showProjectInfo.siteTitle,
                    } }));
            }
            return null;
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Data.fetchData(this.props.queryTemplate, this.props.showSiteTitleColumn, this.props.dataSourceName);
            this.setState({ data: data, isLoading: false });
        });
    }
    /**
     * Render the <BenefitsOverview /> component
     */
    render() {
        if (this.state.isLoading) {
            return (React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.large, label: Resources_1.default.getResource("BenefitsOverview_LoadingText") }));
        }
        if (this.state.data) {
            let { items, columns, groups } = this.getFilteredData(this.props, this.state);
            return (React.createElement("div", { style: { width: "100%" } },
                this.renderCommandBar(this.props, this.state),
                React.createElement("div", { hidden: !this.props.showSearchBox },
                    React.createElement(SearchBox_1.SearchBox, { onChange: st => this.setState({ searchTerm: st.toLowerCase() }), placeholder: Resources_1.default.getResource("BenefitsOverview_SearchBox_Placeholder") })),
                React.createElement(DetailsList_1.DetailsList, { items: items, columns: columns, groups: groups, selectionMode: DetailsList_1.SelectionMode.none, onRenderItemColumn: this.onRenderItemColumn, onColumnHeaderClick: (column, evt) => this.onColumnClick(column, evt) }),
                this.state.showMeasurements && (React.createElement(BenefitMeasurementsModal_1.default, { indicator: this.state.showMeasurements, onDismiss: _ => this.setState({ showMeasurements: null }) })),
                this.renderProjectInfoModal(this.props, this.state)));
        }
        return null;
    }
    onRenderItemColumn(item, index, column) {
        let _openProjectInfoCallback = (event) => {
            event.preventDefault();
            this.setState({ showProjectInfo: item });
        };
        let _openMeasurementsCallback = (_item) => { this.setState({ showMeasurements: _item }); };
        return BenefitsOverviewDataColumns_1.onRenderItemColumn(item, index, column, _openProjectInfoCallback, _openMeasurementsCallback);
    }
    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
     *
     * @param {IBenefitsOverviewProps} param0 Props
     * @param {IBenefitsOverviewState} param1 State
     */
    getFilteredData({ searchProperty }, { groupBy, data, searchTerm }) {
        let columns = [].concat(data.columns);
        let groups = null;
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
    onColumnClick(_event, column) {
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
            }
            else {
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
    exportToExcel() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ excelExportStatus: ExportToExcel_1.ExcelExportStatus.Exporting });
            let { items, columns } = this.getFilteredData(this.props, this.state);
            const sheet = {
                name: this.props.excelExportConfig.sheetName,
                data: [
                    columns.map(column => column.name),
                    ...items.map(item => columns.map(column => item[column.fieldName])),
                ],
            };
            const fileName = String.format(this.props.excelExportConfig.fileName, Resources_1.default.getResource("BenefitsOverview_ExcelExportFileNamePrefix"), Util.dateFormat(new Date().toISOString(), "YYYY-MM-DD-HH-mm"));
            yield ExportToExcel_1.default({ sheets: [sheet], fileName });
            this.setState({ excelExportStatus: ExportToExcel_1.ExcelExportStatus.Idle });
        });
    }
}
BenefitsOverview.displayName = "BenefitsOverview";
BenefitsOverview.defaultProps = IBenefitsOverviewProps_1.BenefitsOverviewDefaultProps;
__decorate([
    Utilities_1.autobind
], BenefitsOverview.prototype, "onRenderItemColumn", null);
__decorate([
    Utilities_1.autobind
], BenefitsOverview.prototype, "onColumnClick", null);
exports.default = BenefitsOverview;
