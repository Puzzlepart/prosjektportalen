import * as React from "react";
import * as ReactDOM from "react-dom";
import Localization from "localization";
import { IBaseFormModifications } from "../Base";
import * as FormUtil from "../Util";
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
           <ChromeTitle title={Localization.getResource("ChangeAnalysis_NextStep_Title")} />
           <p>​​{Localization.getResource("ChangeAnalysis_NextStep_Text")} <a href={`../../${Localization.getResource("DefaultView_BenefitsAnalysis_Url")}`}>{Localization.getResource("ChangeAnalysis_NextStep_LinkText")}</a>​.</p>
        </div>), container);
    },
};

export default _;
