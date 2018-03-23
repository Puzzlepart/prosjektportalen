import RESOURCE_MANAGER from "../../Resources";
import * as pnp from "sp-pnp-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IBaseFormModifications } from "../Base";
import * as FormUtil from "../FormUtils";
import { default as RelatedLogElements } from "./RelatedLogElements";

const _: IBaseFormModifications = {
    NewForm: () => {
        //
    },
    EditForm: () => {
        //
    },
    DispForm: () => {
        const id = "pp-related-logelements";
        const lookupField = "GtProjectLogEventLookup";
        const container = FormUtil.insertFormContainer(id);
        pnp.sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_ProjectLog_Title")).items.filter(`${lookupField}Id eq ${GetUrlKeyValue("ID")}`).get().then(items => {
            ReactDOM.render((
                <RelatedLogElements logElements={items} />
            ), container);
        });
    },
};

export default _;
