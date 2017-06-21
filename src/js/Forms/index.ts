import { Logger, LogLevel } from "sp-pnp-js";
import * as Util from "../Util";
import { IBaseFormModifications } from "./Base";
import HandleQueryParams from "./HandleQueryParams";

const formModifications: { [key: string]: IBaseFormModifications } = {};
formModifications[__("Lists_ProjectLog_Url")] = require("./ProjectLog").default;
formModifications[__("Lists_MeetingCalendar_Url")] = require("./MeetingCalendar").default;
formModifications[__("Lists_PhaseChecklist_Url")] = require("./PhaseChecklist").default;
formModifications[__("Lists_ChangeAnalysis_Url")] = require("./ChangeAnalysis").default;
formModifications[__("Lists_BenefitsAnalysis_Url")] = require("./BenefitsAnalysis").default;


/**
 * Initialize form modifications and web parts
 */
const Initialize = () => {
    Logger.log({ message: "Forms: Initialize form modifications and web parts", level: LogLevel.Info, data: {} });
    let urlParts = Util.getUrlParts();
    let [list] = Object.keys(formModifications).filter(key => _spPageContextInfo.serverRequestPath.indexOf(key) !== -1);
    if (list) {
        if (urlParts[1] === "Lists") {
            formModifications[list][urlParts[3]]();
        } else {
            formModifications[list][urlParts[3]]();
        }
    }
    HandleQueryParams();
};

export { Initialize };
