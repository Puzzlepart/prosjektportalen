"use strict";
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
const sp_1 = require("@pnp/sp");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const IExperienceLogProps_1 = require("./IExperienceLogProps");
const _BaseWebPart_1 = require("../@BaseWebPart");
const List_1 = require("../@Components/List");
const LogElement_1 = require("./LogElement");
/**
 * Experience Log
 */
class ExperienceLog extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IExperienceLogProps} props Props
     */
    constructor(props) {
        super(props, { isLoading: true });
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield this._fetchItems();
                this.setState({ items, isLoading: false });
            }
            catch (err) {
                this.setState({ items: [], isLoading: false });
            }
        });
    }
    /**
     * Renders the <ExperienceLog /> component
     */
    render() {
        if (this.state.isLoading) {
            return (React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.large, label: Resources_1.default.getResource("ExperienceLog_LoadingText") }));
        }
        return (React.createElement(List_1.default, { items: this.state.items, columns: this.props.columns, showCommandBar: true, groupByOptions: this.props.groupByOptions, excelExportEnabled: this.props.excelExportEnabled, excelExportConfig: this.props.excelExportConfig }));
    }
    /**
     * Fetch items
     */
    _fetchItems() {
        return __awaiter(this, void 0, void 0, function* () {
            let queryTemplate;
            if (this.props.queryTemplate) {
                queryTemplate = this.props.queryTemplate;
            }
            else if (this.props.dataSource) {
                const dataSourcesList = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(Resources_1.default.getResource("Lists_DataSources_Title"));
                const [dataSource] = yield dataSourcesList.items.filter(`Title eq '${this.props.dataSource}'`).get();
                queryTemplate = dataSource.GtDpSearchQuery;
            }
            if (queryTemplate) {
                try {
                    const selectProperties = ["Path", "SPWebUrl", ...this.props.columns.map(col => col.key)];
                    const { PrimarySearchResults } = yield sp_1.sp.search({
                        Querytext: "*",
                        QueryTemplate: queryTemplate,
                        RowLimit: 500,
                        TrimDuplicates: false,
                        SelectProperties: selectProperties,
                    });
                    return PrimarySearchResults.map(r => new LogElement_1.default(r));
                }
                catch (err) {
                    throw err;
                }
            }
            else {
                return [];
            }
        });
    }
}
ExperienceLog.displayName = "ExperienceLog";
ExperienceLog.defaultProps = IExperienceLogProps_1.ExperienceLogDefaultProps;
exports.default = ExperienceLog;
