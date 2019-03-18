import * as React from "react";
import __ from "../../../../Resources";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
// import { Icon } from "office-ui-fabric-react/lib/Icon";
// import { ModalLink } from "../../../@Components";
import DataSource from "../../../DataSource";
// import TrendIcon from "./TrendIcon";
import * as objectGet from "object-get";
import { BenefitMeasurementIndicator } from "../BenefitMeasurementIndicator";

const Columns = (): any[] => {
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
        name: "Måleindikator",
        minWidth: 50,
        maxWidth: 180,
    },
    {
        key: "benefit.responsible",
        fieldName: "benefit.responsible",
        name: "Gevinstansvarlig",
        minWidth: 50,
        maxWidth: 180,
        isMultiline: true,
    },
    {
        key: "unit",
        fieldName: "unit",
        name: "Måleenhet",
        minWidth: 50,
        maxWidth: 80,
    },
    {
        key: "startValue",
        fieldName: "startValue",
        name: "Startverdi",
        minWidth: 50,
        maxWidth: 80,
    },
    {
        key: "desiredValue",
        fieldName: "desiredValue",
        name: "Ønsket verdi",
        minWidth: 50,
        maxWidth: 80,
    },
    {
        key: "measurements[0].value",
        fieldName: "measurements[0].value",
        name: "Siste måling",
        minWidth: 50,
        maxWidth: 80,
    },
    {
        key: "measurements[0].achievement",
        fieldName: "measurements[0].achievement",
        name: "Måloppnåelse",
        minWidth: 50,
        maxWidth: 80,
    },
    {
        fieldName: "AllMeasurements",
        key: "AllMeasurements",
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
 * @param {Object} fieldNamesMap Field names map, maps InternalName => Title
 * @param {DataSource} dataSource Data source
 */
export const GenerateColumns = (fieldNamesMap: { [key: string]: string }, dataSource: DataSource): any[] => {
    let generatedColumns = Columns().map(col => (Object.assign(col, {
        name: col.hasOwnProperty("name") ? col.name : fieldNamesMap[col.key] || col.key,
    })));
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
};

/**
 * On render item column
 *
 * @param {BenefitEntry} item The item
 * @param {index} index The index
 * @param {IColumn} column The column
 * @param {Function} _onSiteTitleClick On SiteTitle click event
 * @param {Function} showAllMeasurements On show all measurements
 */
const onRenderItemColumn = (item: BenefitMeasurementIndicator, _index: number, column: IColumn, _onSiteTitleClick: (_event) => void, showAllMeasurements: (item: BenefitMeasurementIndicator) => void): any => {
    if (column.key === "AllMeasurements") {
        if (item.measurements.length > 0) {
            return (
                <a href="#" onClick={_event => showAllMeasurements(item)}>{__.getResource("BenefitsOverview_AllMeasurements")}</a>
            );
        }
        return null;
    }
    return objectGet(item, column.fieldName);
};

export { Columns, onRenderItemColumn };
