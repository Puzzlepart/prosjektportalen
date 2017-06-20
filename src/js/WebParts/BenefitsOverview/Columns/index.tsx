import * as React from "react";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { ModalLink } from "../../../WebParts/@Components";
import DataSource from "../../DataSource";

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
        fieldName: "GtGainsResponsible",
        key: "GtGainsResponsible",
        searchPostfix: "OWSUSER",
        minWidth: 50,
        maxWidth: 180,
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
    latestPercentage: number;
    prevVal: number;
    shouldIncrease: boolean;
}

/**
 * TrendIcon
 */
const TrendIcon = ({ latestVal, latestPercentage, prevVal, shouldIncrease }: ITrendIconProps): JSX.Element => {
    if (prevVal !== undefined && prevVal !== null) {
        if (prevVal !== latestVal) {
            if (shouldIncrease && (prevVal > latestVal)) {
                if (latestPercentage >= 100) {
                    return (
                        <span>
                            <Icon iconName="StockDown" style={{ color: "red" }} />
                            <Icon iconName="Trophy" style={{ color: "gold" }} />
                        </span>
                    );
                }
                return (
                    <span>
                        <Icon iconName="StockDown" style={{ color: "red" }} />
                    </span>
                );
            }
            if (!shouldIncrease && (latestVal > prevVal)) {
                if (latestPercentage >= 100) {
                    return (
                        <span>
                            <Icon iconName="StockDown" style={{ color: "red" }} />
                            <Icon iconName="Trophy" style={{ color: "gold" }} />
                        </span>
                    );
                }
                return (
                    <span>
                        <Icon iconName="StockDown" style={{ color: "red" }} />
                    </span>
                );
            } else {
                if (latestPercentage >= 100) {
                    return (
                        <span>
                            <Icon iconName="StockUp" style={{ color: "green" }} />
                            <Icon iconName="Trophy" style={{ color: "gold" }} />
                        </span>
                    );
                }
                return (
                    <span>
                        <Icon iconName="StockUp" style={{ color: "green" }} />
                    </span>
                );
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
    switch (column.key) {
        case "Title": {
            let dispFormUrl = item.Path;
            if (!dispFormUrl) {
                dispFormUrl = `${_spPageContextInfo.webAbsoluteUrl}/${__("DefaultView_GainsAnalysis_Url")}?ID=${item.ID}`.replace("AllItems", "DispForm");
            }
            return (
                <ModalLink
                    label={colValue}
                    url={dispFormUrl}
                    options={{ HideRibbon: true }} />
            );
        }
        case "SiteTitle": {
            let { SPWebUrl, SiteTitle: Title } = item;
            return <a href={SPWebUrl}>{Title}</a>;
        }
        case "GtStartValue":
        case "GtDesiredValue": {
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
                    {LatestPercentage} % <TrendIcon
                        latestVal={LatestValue}
                        latestPercentage={LatestPercentage}
                        prevVal={PreviousValue}
                        shouldIncrease={ValueShouldIncrese} />
                </div>);
            } else {
                return null;
            }
        }
        case "LatestValue": {
            if (LatestValue && LatestValue !== 0) {
                return (<div>
                    {LatestValue} <TrendIcon
                        latestVal={LatestValue}
                        latestPercentage={LatestPercentage}
                        prevVal={PreviousValue}
                        shouldIncrease={ValueShouldIncrese} />
                </div>);
            } else {
                return null;
            }
        }
        case "GtGainsResponsible": {
            if (column.fieldName.indexOf("OWS") !== -1) {
                const [, Title] = colValue.split(" | ");
                return (
                    <div>
                        {Title}
                    </div>
                );
            }
            if (colValue.Title) {
                return (
                    <div>
                        {colValue.Title}
                    </div>
                );
            }
            return null;
        }
        default: {
            return colValue;
        }
    }
};

export { Columns, _onRenderItemColumn };
