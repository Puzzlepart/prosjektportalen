import {
    StatusFields,
    IStatusProperties,
} from "./Config";

/**
 * Get properties for a status value
 *
 * @param fieldName Field name
 * @param statusValue Status value
 */
const GetStatusProperties = (fieldName: string, statusValue: string): IStatusProperties => {
    if (StatusFields.hasOwnProperty(fieldName)) {
        let find = StatusFields[fieldName].Statuses.filter(({ Value }) => (Value === statusValue));
        if (find.length > 0) {
            return find[0];
        }
        return null;
    }
    return null;
};

/**
 * Get css class for a status value
 *
 * @param fieldName Field name
 * @param statusValue Status value
 */
const GetStatusCssClass = (fieldName: string, statusValue: string) => {
    const properties = GetStatusProperties(fieldName, statusValue);
    if (properties) {
        return properties.CssClass || "no-status";
    }
    return "no-status";
};

export { GetStatusProperties, GetStatusCssClass };
