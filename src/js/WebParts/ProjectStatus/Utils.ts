import { StatusFields } from "./Config";

/**
 * Get css class for a status value
 *
 * @param fieldName Field name
 * @param statusValue Status value
 */
const GetStatusCssClass = (fieldName: string, statusValue: string) => {
    let find = StatusFields[fieldName] ? StatusFields[fieldName].Statuses.filter(({ Value }) => (Value === statusValue)) : [];
    if (find.length > 0) {
        return find[0].CssClass;
    }
    return "no-status";
};

export { GetStatusCssClass };
