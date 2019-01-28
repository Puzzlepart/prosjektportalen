import __ from "../../../../Resources";
import { IList } from "sp-js-provisioning/lib/schema";

const SitePages: IList = {
    Title: __.getResource("Lists_SitePages_Title"),
    Description: "",
    Template: 119,
    ContentTypesEnabled: true,
    AdditionalSettings: {
        EnableVersioning: true,
    },
};

export default SitePages;
