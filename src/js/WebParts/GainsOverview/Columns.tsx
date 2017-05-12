import * as React from "react";
import {
    IColumn,
    Icon,
} from "office-ui-fabric-react";
import DataSource from "../DataSource";

const Columns = (dataSource: DataSource): any[] => {
    return [{
        fieldName: "Title",
        key: "Title",
        name: "Gevinst",
        searchPostfix: null,
        minWidth: 100,
        maxWidth: 180,
        isMultiline: true,
    },
    {
        fieldName: "GtMeasureIndicator",
        key: "GtMeasureIndicator",
        searchPostfix: "OWSTEXT",
        minWidth: 50,
        maxWidth: 180,
        isMultiline: true,
    },
    {
        fieldName: "GtMeasurementUnit",
        key: "GtMeasurementUnit",
        searchPostfix: "OWSCHCS",
        minWidth: 50,
        maxWidth: 80,
    },
    {
        fieldName: "GtStartValue",
        key: "GtStartValue",
        searchPostfix: "OWSNMBR",
        minWidth: 50,
        maxWidth: 80,
    },
    {
        fieldName: "GtDesiredValue",
        key: "GtDesiredValue",
        searchPostfix: "OWSNMBR",
        minWidth: 50,
        maxWidth: 80,
    },
    {
        fieldName: "PreviousValue",
        key: "PreviousValue",
        name: "Forrige måling",
        searchPostfix: null,
        minWidth: 50,
        maxWidth: 80,
    },
    {
        fieldName: "PreviousPercentage",
        key: "PreviousPercentage",
        name: "Måloppnåelse, forrige måling",
        searchPostfix: null,
        minWidth: 50,
        maxWidth: 80,
    },
    {
        fieldName: "LatestValue",
        key: "LatestValue",
        name: "Siste måling",
        searchPostfix: null,
        minWidth: 50,
        maxWidth: 80,
    },
    {
        fieldName: "LatestPercentage",
        key: "LatestPercentage",
        name: "Måloppnåelse, siste måling",
        searchPostfix: null,
        minWidth: 50,
        maxWidth: 80,
    }].map(c => Object.assign(c, {
        fieldName: ((dataSource === DataSource.Search) && c.searchPostfix) ? `${c.fieldName}${c.searchPostfix}` : c.fieldName,
        isResizable: true,
    }));
};

/**
 * Get column by key
 *
 * @param key Key
 * @param dataSource Data source
 */
export const GetColumnByKey = (key: string, dataSource: DataSource): IColumn => {
    let find = Columns(dataSource).filter(col => col.key === key);
    let [col] = find;
    return col;
};

/**
 * Generate columns based on data source and fields
 *
 * @param fields Fields
 * @param dataSource Data source
 */
export const GenerateColumns = (fields: any[], dataSource: DataSource): any[] => {
    let fieldNamesMap: { [key: string]: string } = {};
    fields.forEach(({ InternalName, Title }) => fieldNamesMap[InternalName] = Title);
    let generatedColumns = Columns(dataSource).map(col => (Object.assign(col, {
        name: col.hasOwnProperty("name") ? col.name : (fieldNamesMap[col.key] || col.key),
    })));
    switch (dataSource) {
        case DataSource.Search: {
            /* Adding Site Title for data souce Search */
            generatedColumns.unshift({
                fieldName: "SiteTitle",
                key: "SiteTitle",
                name: "Prosjekt",
                minWidth: 100,
                maxWidth: 180,
            });
        }
    }
    return generatedColumns;
};

interface ITrendIconProps {
    latestVal: number;
    prevVal: number;
    shouldIncrease: boolean;
}

/**
 * TrendIcon
 */
const TrendIcon = ({ latestVal, prevVal, shouldIncrease }: ITrendIconProps): JSX.Element => {
    if (prevVal !== undefined && prevVal !== null) {
        if (prevVal !== latestVal) {
            if (shouldIncrease && (prevVal > latestVal)) {
                return <Icon iconName="StockDown" style={{ color: "red" }} />;
            }
            if (!shouldIncrease && (latestVal > prevVal)) {
                return <Icon iconName="StockDown" style={{ color: "red" }} />;
            } else {
                return <Icon iconName="StockUp" style={{ color: "green" }} />;
            }
        }
    }
};

/**
 * On render item column
 *
 * @param item The item
 * @param index The index
 * @param column The column
 */
const _onRenderItemColumn = (item: any, index: number, column: IColumn): any => {
    let colValue = item[column.fieldName];
    let { LatestValue, PreviousValue, LatestPercentage, ValueShouldIncrese } = item;
    switch (column.fieldName) {
        case "SiteTitle": {
            let { SPWebUrl, SiteTitle: Title } = item;
            return <a href={SPWebUrl}>{Title}</a>;
        }
        case "GtStartValueOWSNMBR":
        case "GtDesiredValueOWSNMBR": {
            let parsedValue = parseInt(colValue, 10);
            return !isNaN(parsedValue) ? parsedValue : "";
        }
        case "PreviousPercentage": {
            let { PreviousPercentage } = item;
            if (PreviousPercentage && PreviousPercentage !== 0) {
                return (<div>
                    {PreviousPercentage} %
                    </div>);
            } else {
                return null;
            }
        }
        case "PreviousValue": {
            if (PreviousValue && PreviousValue !== 0) {
                return (<div>
                    {PreviousValue}
                </div>);
            } else {
                return null;
            }
        }
        case "LatestPercentage": {
            if (LatestPercentage && LatestPercentage !== 0) {
                return (<div style={{ position: "relative" }}>
                    {LatestPercentage} % <TrendIcon latestVal={LatestValue} prevVal={PreviousValue} shouldIncrease={ValueShouldIncrese} />
                </div>);
            } else {
                return null;
            }
        }
        case "LatestValue": {
            if (LatestValue && LatestValue !== 0) {
                return (<div>
                    {LatestValue} <TrendIcon latestVal={LatestValue} prevVal={PreviousValue} shouldIncrease={ValueShouldIncrese} />
                </div>);
            } else {
                return null;
            }
        }
        default: {
            return colValue;
        }
    }
};

export { Columns, _onRenderItemColumn };
