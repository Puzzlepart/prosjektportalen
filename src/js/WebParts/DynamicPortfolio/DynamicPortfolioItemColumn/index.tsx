import * as React from "react";
import * as Util from "../../../Util";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import {
    IDynamicPortfolioColumnConfig,
    IDynamicPortfolioConfiguration,
} from "../DynamicPortfolioConfiguration";

/**
 * Render item column
 *
 * @param {any} item The item
 * @param {number} index Index
 * @param {IDynamicPortfolioColumnConfig} column Column
 * @param {IDynamicPortfolioConfiguration} configuration Configuration
 * @param {Function} titleOnClick Tile column on click
 */
const DynamicPortfolioItemColumn = (item: any, index: number, column: IDynamicPortfolioColumnConfig, configuration: IDynamicPortfolioConfiguration, titleOnClick: (evt: any) => void): JSX.Element => {
    const columnValue = item[column.key];

    switch (column.key) {
        case "Title": {
            return (
                <a
                    href={item.Path}
                    onClick={titleOnClick}>{columnValue}</a>
            );
        }
        case "Path":
        case "URL": {
            return <a href={item.Path}>{columnValue}</a>;
        }
    }
    switch (column.render) {
        case "Date": {
            return (
                <span>
                    {columnValue ? Util.dateFormat(columnValue, "LL") : null}
                </span>
            );
        }
        case "Note": {
            return (
                <span title={columnValue}>{columnValue}</span>
            );
        }
        case "Currency": {
            let currValue = Util.toCurrencyFormat(columnValue);
            return (
                <span title={currValue}>{currValue}</span>
            );
        }
        case "Status": {
            let fieldName = Util.cleanSearchPropName(column.fieldName);
            if (configuration.statusFields.hasOwnProperty(fieldName)) {
                const [statusProperties] = configuration.statusFields[fieldName].statuses.filter(({ statusValue }) => columnValue === statusValue);
                if (statusProperties) {
                    return (
                        <span>
                            <Icon iconName={statusProperties.statusIconName} style={{ color: statusProperties.statusColor }} />  {columnValue}
                        </span>
                    );
                }
            }
            return (
                <span>{columnValue}</span>
            );

        }
        case "Default": {
            return (
                <span title={columnValue}>{columnValue}</span>
            );
        }
        default: {
            return (
                <span title={columnValue}>{columnValue}</span>
            );
        }
    }
};

export default DynamicPortfolioItemColumn;
