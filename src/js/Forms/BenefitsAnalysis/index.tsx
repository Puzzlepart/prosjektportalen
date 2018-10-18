import __ from "../../Resources";
import { sp } from "@pnp/sp";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IBaseFormModifications } from "../Base";
import * as FormUtil from "../FormUtils";
import { RelatedFollowups } from "./RelatedFollowups";
import { ChromeTitle } from "../../WebParts/@Components";


const _: IBaseFormModifications = {
    DispForm: () => {
        const measuresList = sp.web.lists.getByTitle(__.getResource("Lists_BenefitsFollowup_Title"));
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
            <ChromeTitle title={__.getResource("BenefitAnalysis_NextStep_Title")} />
            <p>
                {__.getResource("BenefitAnalysis_NextStep_Text")}
                <a href={`../../${__.getResource("DefaultView_Tasks_Url")}`}>
                    {__.getResource("BenefitAnalysis_NextStep_LinkText")}
                </a>​.
            </p>
        </div>, container);
    },
};

export default _;
