import * as React from "react";
import * as Util from "../../Util";
import { Persona, PersonaSize, PersonaPresence } from "office-ui-fabric-react";

export const _onRenderItemColumn = (item: any, index: number, column: any): any => {
    if (column.key === "Title") {
        return (<a href={item.Path}>{item[column.key]}</a>);
    }
    switch (column.render) {
        case "Date": {
            return item[column.key] ? Util.dateFormat(item[column.key], "LL") : null;
        }
        case "Note": {
            return item[column.key];
        }
        case "Persona": {
            let [EMail, Name] = item[column.key].split(" | ");
            if (EMail && Name) {
                const persona = {
                    imageUrl: Util.userPhoto(EMail),
                    primaryText: Name,
                };
                return (<Persona { ...persona} size={PersonaSize.extraSmall} presence={PersonaPresence.none} />);
            }
            return null;
        }
        case "Default": {
            return item[column.key];
        }
        default: {
            return item[column.key];
        }
    }
};
