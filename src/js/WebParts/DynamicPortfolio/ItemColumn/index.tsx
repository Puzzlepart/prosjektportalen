import * as React from "react";
import * as Util from "../../../Util";
import {
    Persona,
    PersonaSize,
    PersonaPresence,
} from "office-ui-fabric-react/lib/Persona";
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
    if (column.key === "Title") {
        return (
            <a
                href="#"
                onClick={titleOnClick}>{columnValue}</a>
        );
    }
    if (column.key === "Path" || column.key === "URL") {
        return <a href={item.Path}>{columnValue}</a>;
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
            return <span title={columnValue}>{columnValue}</span>;
        }
        case "Persona": {
            let [EMail, Name] = columnValue.split(" | ");
            if (EMail && Name) {
                const persona = {
                    imageUrl: Util.userPhoto(EMail),
                    primaryText: Name,
                };
                return (<Persona { ...persona} size={PersonaSize.extraSmall} presence={PersonaPresence.none} />);
            }
            return null;
        }
        case "Status": {
            if (!columnValue) {
                return null;
            }
            const statusProperties = GetStatusProperties(Util.cleanSearchPropName(column.fieldName), columnValue);
            return (
                <span>
                    <Icon iconName={statusProperties.Icon} style={{ color: statusProperties.Color }} />  {columnValue}
                </span>
            );
        }
        case "Default": {
            return <span title={columnValue}>{columnValue}</span>;
        }
        default: {
            return <span title={columnValue}>{columnValue}</span>;
        }
    }
};

export default _onRenderItemColumn;
