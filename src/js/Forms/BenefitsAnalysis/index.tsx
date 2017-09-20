import { sp } from "sp-pnp-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import RESOURCE_MANAGER from "localization";
import { IBaseFormModifications } from "../Base";
import * as FormUtil from "../FormUtils";
import { RelatedFollowups } from "./RelatedFollowups";
import { ChromeTitle } from "../../WebParts/@Components";


const _: IBaseFormModifications = {
    DispForm: () => {
        const measuresList = sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_BenefitsFollowup_Title"));
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
           <ChromeTitle title={RESOURCE_MANAGER.getResource("BenefitAnalysis_NextStep_Title")} />
           <p>​​{RESOURCE_MANAGER.getResource("BenefitAnalysis_NextStep_Text")} <a href={`../../${RESOURCE_MANAGER.getResource("DefaultView_Tasks_Url")}`}>{RESOURCE_MANAGER.getResource("BenefitAnalysis_NextStep_LinkText")}</a>​.</p>
        </div>, container);
    },
};

export default _;
