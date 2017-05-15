import * as React from "react";
import * as Util from "../../../Util";
import {
    Persona,
    PersonaSize,
    PersonaPresence,
    Icon,
} from "office-ui-fabric-react";
import { IColumnConfig } from "../Configuration";
import { GetStatusProperties } from "../../ProjectStatus/Utils";

/**
 * Rennder item column
 *
 * @param item The item
 * @param index Index
 * @param column Column
 */
const _onRenderItemColumn = (item: any, index: number, column: IColumnConfig): any => {
    const columnValue = item[column.key];
    if (column.key === "Title") {
        return <a href={item.Path}>{columnValue}</a>;
    }
    if (column.key === "Path" || column.key === "URL") {
        return <a href={item.Path}>{columnValue}</a>;
    }
    switch (column.render) {
        case "Date": {
            return columnValue ? Util.dateFormat(columnValue, "LL") : null;
        }
        case "Note": {
            return <span title={columnValue}>columnValue</span>;
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
            return <div><Icon iconName={statusProperties.Icon} style={{ color: statusProperties.Color }} />  {columnValue}</div>;
        }
        case "Default": {
            return <span title={columnValue}>columnValue</span>;
        }
        default: {
            return <span title={columnValue}>columnValue</span>;
        }
    }
};

export default _onRenderItemColumn;
