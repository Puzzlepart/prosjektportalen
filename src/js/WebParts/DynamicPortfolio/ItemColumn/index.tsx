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
 * @param onTitleColumnClick On Title column click
 */
export const _onRenderItemColumn = (item: any, index: number, column: IColumnConfig, onTitleColumnClick: (item: any) => void): any => {
    const columnValue = item[column.key];
    if (column.key === "Title") {
        return (
            <div>
                <Icon
                    iconName="Table"
                    onClick={e => onTitleColumnClick(item)}
                    title="Vis prosjektinfo"
                    style={{
                        cursor: "pointer",
                        marginRight: 5,
                    }} />
                <a href={item.Path}>{columnValue}</a>
            </div>);
    }
    switch (column.render) {
        case "Date": {
            return columnValue ? Util.dateFormat(columnValue, "LL") : null;
        }
        case "Note": {
            return columnValue;
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
            return columnValue;
        }
        default: {
            return columnValue;
        }
    }
};
