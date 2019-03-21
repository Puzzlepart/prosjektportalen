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
const unique = require("array-unique");
const Resources_1 = require("../../../Resources");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
const ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
const SearchBox_1 = require("office-ui-fabric-react/lib/SearchBox");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
const ProjectInfo_1 = require("../../ProjectInfo");
const ModalLink_1 = require("../ModalLink");
const ExportToExcel_1 = require("../../../Util/ExportToExcel");
const Util = require("../../../Util");
class List extends React.PureComponent {
    /**
     * Constructor
     *
     * @param {IListProps} props Props
     */
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            groupBy: props.defaultGroupBy,
        };
    }
    /**
     * Renders the <List /> component
     */
    render() {
        let { items, columns, groups } = this._getFilteredData();
        return (React.createElement("div", null,
            this._renderCommandBar(),
            React.createElement("div", { hidden: !this.props.showSearchBox },
                React.createElement(SearchBox_1.SearchBox, { placeholder: Resources_1.default.getResource("ExperienceLog_SearchBox_Placeholder"), onChanged: this._onSearch })),
            React.createElement(DetailsList_1.DetailsList, { items: items, columns: columns, groups: groups, onRenderItemColumn: this._onRenderItemColumn, constrainMode: DetailsList_1.ConstrainMode.horizontalConstrained, layoutMode: DetailsList_1.DetailsListLayoutMode.fixedColumns, selectionMode: DetailsList_1.SelectionMode.none }),
            this._renderProjectInfoModal()));
    }
    /**
     * Renders command bar
     */
    _renderCommandBar() {
        const items = [];
        const farItems = [];
        if (this.props.groupByOptions && this.props.groupByOptions.length > 0) {
            const noGrouping = {
                key: "NoGrouping",
                name: Resources_1.default.getResource("String_NoGrouping"),
            };
            const subItems = [noGrouping, ...this.props.groupByOptions].map(item => (Object.assign({}, item, { onClick: e => {
                    e.preventDefault();
                    this.setState({ groupBy: item });
                } })));
            items.push({
                key: "Group",
                name: this.state.groupBy.name,
                iconProps: { iconName: "GroupedList" },
                itemType: ContextualMenu_1.ContextualMenuItemType.Header,
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
                disabled: this.state.excelExportStatus === ExportToExcel_1.ExcelExportStatus.Exporting,
                onClick: evt => {
                    evt.preventDefault();
                    this._exportToExcel();
                },
            });
        }
        if (items.length > 0 || farItems.length > 0) {
            return (React.createElement(CommandBar_1.CommandBar, { hidden: !this.props.showCommandBar, items: items, farItems: farItems }));
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
    _onRenderItemColumn(item, index, column) {
        let colValue = item[column.fieldName];
        switch (column.key) {
            case "Title": {
                const path = item[this.props.pathKey];
                if (path) {
                    return (React.createElement(ModalLink_1.default, { label: colValue, url: path, options: { HideRibbon: true } }));
                }
                else {
                    return colValue;
                }
            }
            case "SiteTitle": {
                const webUrl = item[this.props.webUrlKey];
                if (webUrl) {
                    return React.createElement("a", { href: webUrl, onClick: (e) => { e.preventDefault(); this._openProject(item); } }, colValue);
                }
                return colValue;
            }
            default: {
                if (Array.isArray(colValue)) {
                    return (React.createElement("ul", { style: { margin: 0, padding: 0 } }, colValue.map((v, idx) => React.createElement("li", { key: idx }, v))));
                }
                if (column.key.indexOf("OWSDATE") > -1) {
                    return React.createElement("span", null, colValue ? Util.dateFormat(colValue, "LL") : null);
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
    _openProject(project) {
        this.setState({ showProjectInfo: project });
    }
    /**
     * Dismiss project modal
     */
    _dismissProjectInfoModal() {
        this.setState({ showProjectInfo: null });
    }
    /**
     * On search
     *
     * @param {string} searchTerm Search term
     */
    _onSearch(searchTerm) {
        this.setState({ searchTerm: searchTerm.toLowerCase() });
    }
    /**
     * Renders the Project Info modal
     */
    _renderProjectInfoModal() {
        const { showProjectInfo } = this.state;
        if (showProjectInfo) {
            return (React.createElement(ProjectInfo_1.default, { webUrl: showProjectInfo.SPWebUrl, hideChrome: true, showActionLinks: false, showMissingPropsWarning: false, filterField: "GtPcPortfolioPage", labelSize: "l", valueSize: "m", renderMode: ProjectInfo_1.ProjectInfoRenderMode.Modal, modalOptions: {
                    isOpen: true,
                    isDarkOverlay: true,
                    isBlocking: false,
                    onDismiss: this._dismissProjectInfoModal,
                    headerClassName: "ms-font-xxl",
                    headerStyle: { marginBottom: 20 },
                    title: showProjectInfo.SiteTitle,
                } }));
        }
        return null;
    }
    /**
     * Get filtered data based on groupBy and searchTerm (search is case-insensitive)
     */
    _getFilteredData() {
        let items = [].concat(this.props.items).filter(itm => {
            const matches = Object.keys(itm).filter(key => {
                const value = itm[key];
                return value && typeof value === "string" && value.toLowerCase().indexOf(this.state.searchTerm) !== -1;
            }).length;
            return matches > 0;
        });
        let columns = [].concat(this.props.columns);
        let groups = null;
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
    _exportToExcel() {
        return __awaiter(this, void 0, void 0, function* () {
            const { excelExportConfig } = this.props;
            this.setState({ excelExportStatus: ExportToExcel_1.ExcelExportStatus.Exporting });
            let { items, columns } = this._getFilteredData();
            const sheet = {
                name: excelExportConfig.sheetName,
                data: [
                    columns.map(col => col.name),
                    ...items.map(item => columns.map(col => item[col.fieldName])),
                ],
            };
            const fileName = String.format("{0}-{1}.xlsx", excelExportConfig.fileNamePrefix, Util.dateFormat(new Date().toISOString(), "YYYY-MM-DD-HH-mm"));
            yield ExportToExcel_1.default({ sheets: [sheet], fileName });
            this.setState({ excelExportStatus: ExportToExcel_1.ExcelExportStatus.Idle });
        });
    }
}
List.defaultProps = {
    pathKey: "Path",
    webUrlKey: "SPWebUrl",
    defaultGroupBy: { key: "NoGrouping", name: Resources_1.default.getResource("String_NoGrouping") },
};
__decorate([
    Utilities_1.autobind
], List.prototype, "_onRenderItemColumn", null);
__decorate([
    Utilities_1.autobind
], List.prototype, "_dismissProjectInfoModal", null);
__decorate([
    Utilities_1.autobind
], List.prototype, "_onSearch", null);
exports.default = List;
