import RESOURCE_MANAGER from "../../Resources";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IBaseFormModifications } from "../Base";
import * as FormUtil from "../FormUtils";
import { ChromeTitle } from "../../WebParts/@Components";

const _: IBaseFormModifications = {
    NewForm: () => {
        //
    },
    EditForm: () => {
        //
    },
    DispForm: () => {
        //
    },
    AllItems: () => {
        const id = "pp-next-step";
        const container = FormUtil.insertFormContainer(id);
        ReactDOM.render((<div>
           <ChromeTitle title={RESOURCE_MANAGER.getResource("ChangeAnalysis_NextStep_Title")} />
           <p>​​{RESOURCE_MANAGER.getResource("ChangeAnalysis_NextStep_Text")} <a href={`../../${RESOURCE_MANAGER.getResource("DefaultView_BenefitsAnalysis_Url")}`}>{RESOURCE_MANAGER.getResource("ChangeAnalysis_NextStep_LinkText")}</a>​.</p>
        </div>), container);
    },
};

export default _;
