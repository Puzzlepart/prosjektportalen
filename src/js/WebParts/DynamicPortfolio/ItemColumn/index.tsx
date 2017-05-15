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
    switch (column.render) {
        case "Date": {
            return (
                <div>
                    {columnValue ? Util.dateFormat(columnValue, "LL") : null}
                </div>
            );
        }
        case "Note": {
            return (
                <div>
                    {columnValue}
                </div>
            );
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
                <div>
                    <Icon iconName={statusProperties.Icon} style={{ color: statusProperties.Color }} />  {columnValue}
                </div>
            );
        }
        case "Default": {
            return (
                <div>
                    {columnValue}
                </div>
            );
        }
        default: {
            return (
                <div>
                    {columnValue}
                </div>
            );

        }
    }
};

export default _onRenderItemColumn;
