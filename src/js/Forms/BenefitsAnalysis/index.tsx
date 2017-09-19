import { sp } from "sp-pnp-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Localization from "localization";
import { IBaseFormModifications } from "../Base";
import * as FormUtil from "../Util";
import { RelatedFollowups } from "./RelatedFollowups";
import { ChromeTitle } from "../../WebParts/@Components";


const _: IBaseFormModifications = {
    DispForm: () => {
        const measuresList = sp.web.lists.getByTitle(Localization.getResource("Lists_BenefitsFollowup_Title"));
        const id = "pp-related-gains-followup";
        const lookupField = "GtGainLookup";
        const container = FormUtil.insertFormContainer(id);
        measuresList
            .items
            .filter(`${lookupField}Id eq ${GetUrlKeyValue("ID")}`)
            .orderBy("GtMeasurementDate", false)
            .get().then(items => {
                ReactDOM.render(<RelatedFollowups followups={items} />, container);
            });
    },
    AllItems: () => {
        const id = "pp-next-step";
        const container = FormUtil.insertFormContainer(id);
        ReactDOM.render(<div>
           <ChromeTitle title={Localization.getResource("BenefitAnalysis_NextStep_Title")} />
           <p>​​{Localization.getResource("BenefitAnalysis_NextStep_Text")} <a href={`../../${Localization.getResource("DefaultView_Tasks_Url")}`}>{Localization.getResource("BenefitAnalysis_NextStep_LinkText")}</a>​.</p>
        </div>, container);
    },
};

export default _;
