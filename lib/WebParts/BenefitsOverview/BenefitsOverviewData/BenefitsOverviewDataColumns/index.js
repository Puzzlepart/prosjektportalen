"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../../Resources");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const objectGet = require("object-get");
exports.Columns = () => {
    return [{
            key: "benefit.title",
            fieldName: "benefit.title",
            name: Resources_1.default.getResource("Lists_BenefitsAnalysis_Fields_Title_DisplayName"),
            minWidth: 100,
            maxWidth: 180,
            isMultiline: true,
        },
        {
            key: "title",
            fieldName: "title",
            name: Resources_1.default.getResource("SiteFields_GtMeasureIndicatorLookup_DisplayName"),
            minWidth: 50,
            maxWidth: 180,
        },
        {
            key: "benefit.responsible",
            fieldName: "benefit.responsible",
            name: Resources_1.default.getResource("SiteFields_GtGainsResponsible_DisplayName"),
            minWidth: 50,
            maxWidth: 180,
            isMultiline: true,
        },
        {
            key: "unit",
            fieldName: "unit",
            name: Resources_1.default.getResource("SiteFields_GtMeasurementUnit_DisplayName"),
            minWidth: 50,
            maxWidth: 80,
        },
        {
            key: "startValue",
            fieldName: "startValue",
            name: Resources_1.default.getResource("SiteFields_GtStartValue_DisplayName"),
            minWidth: 50,
            maxWidth: 80,
        },
        {
            key: "desiredValue",
            fieldName: "desiredValue",
            name: Resources_1.default.getResource("SiteFields_GtDesiredValue_DisplayName"),
            minWidth: 50,
            maxWidth: 80,
        },
        {
            key: "measurements[0].value",
            fieldName: "measurements[0].value",
            name: Resources_1.default.getResource("BenefitsOverview_LatestValue"),
            minWidth: 50,
            maxWidth: 80,
        },
        {
            key: "measurements[0].achievementStr",
            fieldName: "measurements[0].achievementStr",
            name: Resources_1.default.getResource("String_AchievementOfObjectives"),
            minWidth: 50,
            maxWidth: 80,
        },
        {
            fieldName: "allMeasurements",
            key: "allMeasurements",
            name: "",
            minWidth: 50,
            maxWidth: 80,
        }].map(col => (Object.assign({}, col, { isResizable: true })));
};
/**
 * Get column by key
 *
 * @param {string} key Key
 */
exports.GetColumnByKey = (key) => {
    let find = exports.Columns().filter(column => column.key === key);
    let [col] = find;
    return col;
};
/**
 * Generate columns based on data source and fields
 *
 * @param {boolean} showSiteTitleColumn Show site title column
 */
function GenerateColumns(showSiteTitleColumn) {
    let generatedColumns = exports.Columns();
    if (showSiteTitleColumn) {
        generatedColumns.unshift({
            fieldName: "siteTitle",
            key: "siteTitle",
            name: Resources_1.default.getResource("String_Project"),
            minWidth: 100,
            maxWidth: 180,
        });
    }
    return generatedColumns;
}
exports.GenerateColumns = GenerateColumns;
/**
 * On render item column
 *
 * @param {BenefitEntry} item The item
 * @param {index} index The index
 * @param {IColumn} column The column
 * @param {Function} openProjectInfoCallback On SiteTitle click event
 * @param {Function} openMeasurementsCallback On show all measurements
 */
function onRenderItemColumn(item, _index, column, openProjectInfoCallback, openMeasurementsCallback) {
    const colValue = objectGet(item, column.fieldName);
    switch (column.key) {
        case "siteTitle": {
            return React.createElement("a", { href: item.webUrl, onClick: openProjectInfoCallback }, colValue);
        }
        case "measurements[0].achievementStr": {
            const trendIconProps = objectGet(item, "measurements[0].trendIconProps");
            if (colValue) {
                return (React.createElement("span", null,
                    React.createElement("span", null, colValue),
                    trendIconProps && React.createElement(Icon_1.Icon, Object.assign({}, trendIconProps))));
            }
            return null;
        }
        case "allMeasurements": {
            if (item.measurements.length > 0) {
                return (React.createElement("a", { href: "#", onClick: _ => openMeasurementsCallback(item) }, Resources_1.default.getResource("BenefitsOverview_AllMeasurements")));
            }
            return null;
        }
    }
    return colValue;
}
exports.onRenderItemColumn = onRenderItemColumn;
