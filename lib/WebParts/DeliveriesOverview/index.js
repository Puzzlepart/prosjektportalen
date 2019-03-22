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
const sp_1 = require("@pnp/sp");
const Resources_1 = require("../../Resources");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const _BaseWebPart_1 = require("../@BaseWebPart");
const IDeliveriesOverviewProps_1 = require("./IDeliveriesOverviewProps");
const List_1 = require("../@Components/List");
const DeliveryElement_1 = require("./DeliveryElement");
const DataSource_1 = require("../DataSource");
/**
 * Deliveries Overview SPA
 */
class DeliveriesOverview extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IDeliveriesOverviewProps} props Props
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
     * Renders the <ProjectResources /> component
     */
    render() {
        if (this.state.isLoading) {
            return (React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.large, label: Resources_1.default.getResource("DeliveriesOverview_LoadingText") }));
        }
        return (React.createElement(List_1.default, { items: this.state.items, columns: this.props.columns, showCommandBar: true, groupByOptions: this.props.groupByOptions, excelExportEnabled: this.props.excelExportEnabled, excelExportConfig: this.props.excelExportConfig }));
    }
    /**
     * Fetch items
     */
    _fetchItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSourcesList = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(Resources_1.default.getResource("Lists_DataSources_Title"));
            const [dataSource] = yield dataSourcesList.items.filter(`Title eq '${this.props.dataSourceName}'`).get();
            const query = dataSource ? dataSource.GtDpSearchQuery : "";
            const queryTemplate = (this.props.dataSource === DataSource_1.default.SearchCustom && this.props.queryTemplate) ? this.props.queryTemplate : query;
            if (queryTemplate !== "") {
                return this._search(queryTemplate);
            }
            else {
                return [];
            }
        });
    }
    _search(queryTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { PrimarySearchResults } = yield sp_1.sp.search({
                    Querytext: "*",
                    QueryTemplate: queryTemplate,
                    RowLimit: 500,
                    TrimDuplicates: false,
                    SelectProperties: ["Path", "SPWebUrl", ...this.props.columns.map(col => col.key)],
                });
                return PrimarySearchResults.map(r => new DeliveryElement_1.default(r));
            }
            catch (err) {
                throw err;
            }
        });
    }
}
DeliveriesOverview.displayName = "DeliveriesOverview";
DeliveriesOverview.defaultProps = IDeliveriesOverviewProps_1.DeliveriesOverviewDefaultProps;
exports.default = DeliveriesOverview;
