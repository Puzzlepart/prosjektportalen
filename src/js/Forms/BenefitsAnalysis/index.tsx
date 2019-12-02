import __ from "../../Resources";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IBaseFormModifications } from "../Base";
import * as FormUtil from "../FormUtils";
import { ChromeTitle } from "../../WebParts/@Components";

const _: IBaseFormModifications = {
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
