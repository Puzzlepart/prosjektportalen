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
    let colValue = item[column.key];

    if (colValue) {
        if (colValue !== "" && (column.key.indexOf("OWSNMBR") !== -1 || column.key.indexOf("OWSCURR") !== -1)) {
            colValue = parseInt(colValue, 10);
        }
        switch (column.key) {
            case "Title": {
                return (
                    <a
                        href={item.Path}
                        onClick={titleOnClick}>{colValue}</a>
                );
            }
            case "Path":
            case "URL": {
                return <a href={item.Path}>{colValue}</a>;
            }
        }
        switch (column.render) {
            case "Date": {
                return (
                    <span>
                        {colValue ? Util.dateFormat(colValue, "LL") : null}
                    </span>
                );
            }
            case "Note": {
                return (
                    <span title={colValue}>{colValue}</span>
                );
            }
            case "Currency": {
                let currValue = Util.toCurrencyFormat(colValue);
                return (
                    <span title={currValue}>{currValue}</span>
                );
            }
            case "Status": {
                let fieldName = Util.cleanSearchPropName(column.fieldName);
                if (configuration.statusFields.hasOwnProperty(fieldName)) {
                    const [statusProperties] = configuration.statusFields[fieldName].statuses.filter(({ statusValue }) => colValue === statusValue);
                    if (statusProperties) {
                        return (
                            <span>
                                <Icon iconName={statusProperties.statusIconName} style={{ color: statusProperties.statusColor }} />  {colValue}
                            </span>
                        );
                    }
                }
                return (
                    <span>{colValue}</span>
                );

            }
            case "URL": {
                let urlVals = colValue.split(",");
                return (
                    <a title={urlVals[1]} href={urlVals[0]}>{urlVals[1]}</a>
                );
            }
            case "Default": {
                return (
                    <span title={colValue}>{colValue}</span>
                );
            }
            default: {
                return (
                    <span title={colValue}>{colValue}</span>
                );
            }
        }
    } else {
        return null;
    }
};

export default DynamicPortfolioItemColumn;
