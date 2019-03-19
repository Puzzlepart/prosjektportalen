import * as React from "react";
import __ from "../../../../Resources";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import DataSource from "../../../DataSource";
import * as objectGet from "object-get";
import { BenefitMeasurementIndicator } from "../BenefitMeasurementIndicator";

export const Columns = (): any[] => {
    return [{
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
    },
    {
        key: "desiredValue",
        fieldName: "desiredValue",
        name: __.getResource("SiteFields_GtDesiredValue_DisplayName"),
        minWidth: 50,
        maxWidth: 80,
    },
    {
        key: "measurements[0].value",
        fieldName: "measurements[0].value",
        name: __.getResource("BenefitsOverview_LatestValue"),
        minWidth: 50,
        maxWidth: 80,
    },
    {
        key: "measurements[0].achievementStr",
        fieldName: "measurements[0].achievementStr",
        name: __.getResource("String_AchievementOfObjectives"),
        minWidth: 50,
        maxWidth: 80,
    },
    {
        fieldName: "allMeasurements",
        key: "allMeasurements",
        name: "",
        minWidth: 50,
        maxWidth: 80,
    }].map(col => ({ ...col, isResizable: true }));
};

/**
 * Get column by key
 *
 * @param {string} key Key
 */
export const GetColumnByKey = (key: string): IColumn => {
    let find = Columns().filter(column => column.key === key);
    let [col] = find;
    return col;
};

/**
 * Generate columns based on data source and fields
 *
 * @param {DataSource} dataSource Data source
 */
export function GenerateColumns(dataSource: DataSource): any[] {
    let generatedColumns = Columns();
    if (dataSource === DataSource.Search) {
        generatedColumns.unshift({
            fieldName: "siteTitle",
            key: "siteTitle",
            name: __.getResource("String_Project"),
            minWidth: 100,
            maxWidth: 180,
        });
    }
    return generatedColumns;
}

/**
 * On render item column
 *
 * @param {BenefitEntry} item The item
 * @param {index} index The index
 * @param {IColumn} column The column
 * @param {Function} openProjectInfoCallback On SiteTitle click event
 * @param {Function} openMeasurementsCallback On show all measurements
 */
export function onRenderItemColumn(item: BenefitMeasurementIndicator, _index: number, column: IColumn, openProjectInfoCallback: (event: React.MouseEvent<any>) => void, openMeasurementsCallback: (item: BenefitMeasurementIndicator) => void): any {
    const colValue = objectGet(item, column.fieldName);

    switch (column.key) {
        case "siteTitle": {
            return <a href={item.webUrl} onClick={openProjectInfoCallback}>{colValue}</a>;
        }
        case "measurements[0].achievementStr": {
            const trendIconProps = objectGet(item, "measurements[0].trendIconProps");
            if (colValue) {
                return (
                    <span>
                        <span>{colValue}</span>
                        {trendIconProps && <Icon {...trendIconProps} />}
                    </span>
                );
            }
            return null;
        }
        case "allMeasurements": {
            if (item.measurements.length > 0) {
                return (
                    <a href="#" onClick={_ => openMeasurementsCallback(item)}>{__.getResource("BenefitsOverview_AllMeasurements")}</a>
                );
            }
            return null;
        }
    }
    return colValue;
}
