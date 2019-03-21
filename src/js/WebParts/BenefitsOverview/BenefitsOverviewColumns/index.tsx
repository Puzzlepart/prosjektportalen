import * as React from "react";
import __ from "../../../Resources";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import * as objectGet from "object-get";
import { BenefitMeasurementIndicator } from "../BenefitsOverviewData/BenefitMeasurementIndicator";

const Columns: IColumn[] = [{
    key: "benefit.title",
    fieldName: "benefit.title",
    name: __.getResource("Lists_BenefitsAnalysis_Fields_Title_DisplayName"),
    minWidth: 100,
    maxWidth: 180,
    isMultiline: true,
},
{
    key: "title",
    fieldName: "title",
    name: __.getResource("SiteFields_GtMeasureIndicatorLookup_DisplayName"),
    minWidth: 50,
    maxWidth: 180,
},
{
    key: "benefit.responsible",
    fieldName: "benefit.responsible",
    name: __.getResource("SiteFields_GtGainsResponsible_DisplayName"),
    minWidth: 50,
    maxWidth: 180,
    isMultiline: true,
},
{
    key: "unit",
    fieldName: "unit",
    name: __.getResource("SiteFields_GtMeasurementUnit_DisplayName"),
    minWidth: 50,
    maxWidth: 80,
},
{
    key: "startValue",
    fieldName: "startValue",
    name: __.getResource("SiteFields_GtStartValue_DisplayName"),
    minWidth: 50,
    maxWidth: 80,
    data: { onCustomRender: (item: BenefitMeasurementIndicator) => objectGet(item, "startValueDisplay") },
},
{
    key: "desiredValue",
    fieldName: "desiredValue",
    name: __.getResource("SiteFields_GtDesiredValue_DisplayName"),
    minWidth: 50,
    maxWidth: 80,
    data: { onCustomRender: (item: BenefitMeasurementIndicator) => objectGet(item, "desiredValueDisplay") },
},
{
    key: "measurements[0].value",
    fieldName: "measurements[0].value",
    name: __.getResource("BenefitsOverview_LatestValue"),
    minWidth: 50,
    maxWidth: 80,
    data: { onCustomRender: (item: BenefitMeasurementIndicator) => objectGet(item, "measurements[0].valueDisplay") },
},
{
    key: "measurements[0].achievement",
    fieldName: "measurements[0].achievement",
    name: __.getResource("String_AchievementOfObjectives"),
    minWidth: 50,
    maxWidth: 80,
    data: {
        onCustomRender: (item: BenefitMeasurementIndicator) => {
            const colValue = objectGet(item, "measurements[0].achievementDisplay");
            const trendIconProps = objectGet(item, "measurements[0].trendIconProps");
            if (colValue) {
                return (
                    <span>
                        <span style={{ display: "inline-block", width: 20 }}>{trendIconProps && <Icon {...trendIconProps} />}</span>
                        <span>{colValue}</span>
                    </span>
                );
            }
            return null;
        },
    },
},
{
    fieldName: "allMeasurements",
    key: "allMeasurements",
    name: "",
    minWidth: 50,
    maxWidth: 80,
    data: {
        onCustomRender: (item: BenefitMeasurementIndicator, column: IColumn, callbacks: { [key: string]: (item: BenefitMeasurementIndicator) => void }) => {
            if (item.measurements.length > 0) {
                return <a href="#" onClick={_ => callbacks[column.fieldName](item)}>{__.getResource("BenefitsOverview_AllMeasurements")}</a>;
            }
            return null;
        },
    },
},
].map(col => ({ ...col, isResizable: true }));


/**
 * Get columns
 *
 * @param {boolean} showSiteTitleColumn Show site title column
 */
export function GetColumns(showSiteTitleColumn: boolean): any[] {
    let _columns = Columns;
    if (showSiteTitleColumn) {
        _columns.unshift({
            fieldName: "siteTitle",
            key: "siteTitle",
            name: __.getResource("String_Project"),
            minWidth: 100,
            maxWidth: 180,
            data: {
                onCustomRender: (item: BenefitMeasurementIndicator, column: IColumn, callbacks: { [key: string]: (item: BenefitMeasurementIndicator) => void }) => {
                    const colValue = objectGet(item, column.fieldName);
                    return <a href="#" onClick={_ => callbacks[column.fieldName](item)}>{colValue}</a>;
                },
            },
        });
    }
    return _columns;
}
