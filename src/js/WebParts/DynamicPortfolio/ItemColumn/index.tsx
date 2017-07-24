import * as React from "react";
import * as Util from "../../../Util";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { IColumnConfig } from "../Configuration";
import { GetStatusProperties } from "../../ProjectStatus/Utils";

/**
 * Rennder item column
 *
 * @param item The item
 * @param index Index
 * @param column Column
 * @param titleOnClick Tile column on click
 */
const _onRenderItemColumn = (item: any, index: number, column: IColumnConfig, titleOnClick: (evt: any) => void): JSX.Element => {
    const columnValue = item[column.key];

    switch (column.key) {
        case "LinkProjectStatus": {
            console.log(item.Path);
            return (
                <a href={`${item.Path}/SitePages/ProjectStatus.aspx`}>
                    <Icon iconName="BarChart4" />
                </a>
            );
        }
        case "Title": {
            return (
                <a
                    href="#"
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

            const statusProperties = GetStatusProperties(Util.cleanSearchPropName(column.fieldName), columnValue);
            return (
                <span>
                    <Icon iconName={statusProperties.Icon} style={{ color: statusProperties.Color }} />  {columnValue}
                </span>
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

    return (
        <span>
        </span>
    );
};

export default _onRenderItemColumn;
