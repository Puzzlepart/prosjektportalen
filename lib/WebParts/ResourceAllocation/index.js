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
//#region Imports
const Resources_1 = require("../../Resources");
const React = require("react");
const react_calendar_timeline_1 = require("react-calendar-timeline");
const sp_1 = require("@pnp/sp");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
const IResourceAllocationProps_1 = require("./IResourceAllocationProps");
const ResourceAllocationModels_1 = require("./ResourceAllocationModels");
const ResourceAllocationDetailsModal_1 = require("./ResourceAllocationDetailsModal");
const ResourceAllocationCommandBar_1 = require("./ResourceAllocationCommandBar");
const _BaseWebPart_1 = require("../@BaseWebPart");
const moment = require("moment");
const DataSource_1 = require("../DataSource");
//#endregion
/**
 * Component: ResourceAllocation
 */
class ResourceAllocation extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IResourceAllocationProps} props Props
     */
    constructor(props) {
        super(props, { isLoading: true });
        moment.locale(Resources_1.default.getResource("MomentDate_Locale"));
    }
    /**
     * Component did mount
     *
     * Fetching required data, and updating state
     */
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.fetchData();
                this.setState(Object.assign({}, data, { isLoading: false }));
            }
            catch (err) {
                console.log(err);
                this.setState({ isLoading: false });
            }
        });
    }
    /**
     * Renders the <ResourceAllocation /> component
     */
    render() {
        if (this.state.isLoading) {
            return (React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.large, label: Resources_1.default.getResource("ResourceAllocation_LoadingText") }));
        }
        const data = this.getTimelineData(this.state);
        if (data.groups.length === 0 || data.items.length === 0) {
            return React.createElement(MessageBar_1.MessageBar, null, Resources_1.default.getResource("ResourceAllocation_ErrorText"));
        }
        return (React.createElement("div", null,
            React.createElement(MessageBar_1.MessageBar, null,
                React.createElement("div", { dangerouslySetInnerHTML: { __html: String.format(Resources_1.default.getResource("ResourceAllocation_LinkText"), `../Lists/ResourceAllocation/AllItems.aspx?Source=${encodeURIComponent(window.location.href)}`) } })),
            React.createElement("div", { className: "allocation-cmd-bar" },
                React.createElement(ResourceAllocationCommandBar_1.default, { users: this.state.users, allocations: this.state.allocations, selected: this.state.selected, onSelectionUpdate: this.onSelectionUpdate })),
            React.createElement(react_calendar_timeline_1.default, { groups: data.groups, items: data.items, itemRenderer: this.timelineItemRenderer, stackItems: true, canMove: false, canChangeGroup: false, sidebarWidth: 220, defaultTimeStart: moment().subtract(1, "months"), defaultTimeEnd: moment().add(1, "years") },
                React.createElement(react_calendar_timeline_1.TimelineMarkers, null,
                    React.createElement(react_calendar_timeline_1.TodayMarker, null))),
            React.createElement(ResourceAllocationDetailsModal_1.default, { allocation: this.state.allocationDisplay, onDismiss: this.onResourceAllocationDetailsModalDismiss })));
    }
    /**
     * Get data for the timeline
     */
    getTimelineData({ users, allocations, selected }) {
        const items = allocations
            .filter(alloc => {
            if (!(alloc.user)) {
                return false;
            }
            if (selected) {
                if (selected.project) {
                    return alloc.project && (alloc.project.name === selected.project);
                }
                if (selected.role) {
                    return (alloc.role === selected.role);
                }
            }
            return true;
        })
            .map((alloc, idx) => {
            return Object.assign({ id: idx, title: alloc.toString(), group: alloc.user.id, type: alloc.type }, alloc);
        });
        const groups = users
            .map(user => ({ id: user.id, title: user.name }))
            .sort((a, b) => (a.title < b.title) ? -1 : ((a.title > b.title) ? 1 : 0))
            .filter(grp => {
            if (selected) {
                if (selected.user) {
                    return grp.id === selected.user.id;
                }
                return items.filter(alloc => alloc.user.id === grp.id).length > 0;
            }
            return true;
        });
        return { groups, items };
    }
    /**
     * Timeline item renderer
     */
    timelineItemRenderer({ item, itemContext, getItemProps }) {
        const props = getItemProps(item.itemProps);
        const itemOpacity = item.allocationPercentage < 30 ? 0.3 : item.allocationPercentage / 100;
        const itemColor = item.allocationPercentage < 40 ? "#000" : "#fff";
        const itemStyle = Object.assign({}, props.style, { color: itemColor, border: "none", cursor: "pointer", outline: "none" });
        switch (item.type) {
            case ResourceAllocationModels_1.ProjectAllocationType.ProjectAllocation: {
                return (React.createElement("div", { key: props.key, className: props.className, style: Object.assign({}, itemStyle, { background: "rgb(51,153,51)", backgroundColor: `rgba(51,153,51,${itemOpacity})` }), title: itemContext.title, onClick: event => this.onTimelineItemClick(event, item) },
                    React.createElement("div", { className: "rct-item-content", style: { maxHeight: `${itemContext.dimensions.height}` } }, itemContext.title)));
            }
            case ResourceAllocationModels_1.ProjectAllocationType.Absence: {
                const portfolioColorRGB = item.absence === Resources_1.default.getResource("Choice_GtResourceAbsence_Leave") ? "205, 92, 92" : "26,111,179"; // Use red color if type=leave, else use blue portfolio color
                return (React.createElement("div", { key: props.key, className: props.className, style: Object.assign({}, itemStyle, { background: `rgb(${portfolioColorRGB})`, backgroundColor: `rgba(${portfolioColorRGB},${itemOpacity})` }), title: itemContext.title, onClick: event => this.onTimelineItemClick(event, item) },
                    React.createElement("div", { className: "rct-item-content", style: { maxHeight: `${itemContext.dimensions.height}` } }, itemContext.title)));
            }
        }
    }
    /**
     * On timeline item click, sets {allocationDisplay} in component state
     *
     * @param {React.MouseEvent} event Event
     * @param {any} item Item
     */
    onTimelineItemClick(event, item) {
        event.preventDefault();
        this.setState({ allocationDisplay: item });
    }
    /**
     * On dismiss ResourceAllocationDetailsModal, sets {allocationDisplay} to null in component state
     */
    onResourceAllocationDetailsModalDismiss() {
        this.setState({ allocationDisplay: null });
    }
    onSelectionUpdate(selected) {
        event.preventDefault();
        this.setState({ selected: selected });
    }
    /**
     * Fetch data, parses the data, and creates arrays for [users] and [allocations]
     */
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            const [searchResult, itemsAvailability] = yield Promise.all([
                this.searchAllocationItems(),
                this.fetchAvailabilityItems(),
            ]);
            // Mapping allocations and availability
            const availability = itemsAvailability.map(item => {
                const portfolioAbsence = new ResourceAllocationModels_1.ProjectResourceAllocation(item.GtResourceUser.Title, item.GtStartDate, item.GtEndDate, item.GtResourceLoad, ResourceAllocationModels_1.ProjectAllocationType.Absence, item.Title, item.GtResourceAbsenceComment);
                portfolioAbsence.absence = item.GtResourceAbsence;
                return portfolioAbsence;
            });
            const allocations = [
                ...availability,
                ...searchResult.map(res => {
                    const projectAbsence = new ResourceAllocationModels_1.ProjectResourceAllocation(res.RefinableString71, res.GtStartDateOWSDATE, res.GtEndDateOWSDATE, res.GtResourceLoadOWSNMBR, ResourceAllocationModels_1.ProjectAllocationType.ProjectAllocation, res.Title, res.GtResourceAbsenceCommentOWSTEXT);
                    projectAbsence.project = { name: res.SiteTitle, url: res.SPWebUrl };
                    projectAbsence.role = res.RefinableString72;
                    return projectAbsence;
                }),
            ];
            let users = [];
            let userId = 0;
            for (let i = 0; i < allocations.length; i++) {
                let [user] = users.filter(r => r.name === allocations[i].name);
                if (!user) {
                    user = new ResourceAllocationModels_1.ProjectUser(userId, allocations[i].name);
                    users.push(user);
                    userId++;
                }
                allocations[i].user = user;
                user.allocations.push(allocations[i]);
            }
            return { users, allocations };
        });
    }
    /**
     * Searches for allocation items using sp.search
     */
    searchAllocationItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSourcesList = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(Resources_1.default.getResource("Lists_DataSources_Title"));
            const [dataSource] = yield dataSourcesList.items.filter(`Title eq '${this.props.dataSourceName}'`).get();
            let queryTemplate = "";
            if (this.props.dataSource === DataSource_1.default.SearchCustom && this.props.queryTemplate) {
                queryTemplate = this.props.queryTemplate;
            }
            else {
                if (dataSource) {
                    queryTemplate = dataSource.GtDpSearchQuery;
                }
            }
            if (queryTemplate !== "") {
                try {
                    const searchSettings = Object.assign({ QueryTemplate: queryTemplate }, this.props.searchConfiguration);
                    const { PrimarySearchResults } = yield sp_1.sp.search(searchSettings);
                    return PrimarySearchResults;
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
    /**
     * Fetches availability items from list on root
     */
    fetchAvailabilityItems() {
        return __awaiter(this, void 0, void 0, function* () {
            let itemsAvailabilityList;
            if (this.props.dataSource && this.props.dataSource === DataSource_1.default.SearchCustom) {
                if (this.props.projectRoot && this.props.projectRoot !== "") {
                    itemsAvailabilityList = new sp_1.Web(this.props.projectRoot).lists.getByTitle(Resources_1.default.getResource("Lists_ResourceAllocation_Title"));
                }
            }
            else {
                itemsAvailabilityList = yield sp_1.sp.web.lists.getByTitle(Resources_1.default.getResource("Lists_ResourceAllocation_Title"));
            }
            const itemsAvailability = yield itemsAvailabilityList
                .items
                .select("Title", "GtResourceUser/Title", "GtStartDate", "GtEndDate", "GtResourceLoad", "GtResourceAbsence")
                .expand("GtResourceUser")
                .get();
            return itemsAvailability;
        });
    }
}
ResourceAllocation.displayName = "ResourceAllocation";
ResourceAllocation.defaultProps = IResourceAllocationProps_1.ResourceAllocationDefaultProps;
__decorate([
    Utilities_1.autobind
], ResourceAllocation.prototype, "timelineItemRenderer", null);
__decorate([
    Utilities_1.autobind
], ResourceAllocation.prototype, "onTimelineItemClick", null);
__decorate([
    Utilities_1.autobind
], ResourceAllocation.prototype, "onResourceAllocationDetailsModalDismiss", null);
__decorate([
    Utilities_1.autobind
], ResourceAllocation.prototype, "onSelectionUpdate", null);
exports.default = ResourceAllocation;
