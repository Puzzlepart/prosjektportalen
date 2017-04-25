import * as pnp from "sp-pnp-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IBaseFormModifications } from "../Base";
import * as FormUtil from "../Util";
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
        const lookupField = "Til_x0020_prosjektstyre";
        const container = FormUtil.insertFormContainer(id);
        pnp.sp.web.lists.getByTitle("Prosjektlogg").items.filter(`${lookupField}Id eq ${GetUrlKeyValue("ID")}`).get().then(items => {
            ReactDOM.render(<RelatedLogElements logElements={items} />, container);
        });
    },
};

export default _;
