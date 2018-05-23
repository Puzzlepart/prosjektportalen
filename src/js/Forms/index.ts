import RESOURCE_MANAGER from "../Resources";
import * as Util from "../Util";
import { IBaseFormModifications } from "./Base";
import HandleQueryParams from "./HandleQueryParams";

const formModifications: { [key: string]: IBaseFormModifications } = {};
formModifications[RESOURCE_MANAGER.getResource("Lists_ProjectLog_Url")] = require("./ProjectLog").default;
formModifications[RESOURCE_MANAGER.getResource("Lists_MeetingCalendar_Url")] = require("./MeetingCalendar").default;
formModifications[RESOURCE_MANAGER.getResource("Lists_PhaseChecklist_Url")] = require("./PhaseChecklist").default;
formModifications[RESOURCE_MANAGER.getResource("Lists_ChangeAnalysis_Url")] = require("./ChangeAnalysis").default;
formModifications[RESOURCE_MANAGER.getResource("Lists_BenefitsAnalysis_Url")] = require("./BenefitsAnalysis").default;


/**
 * Initialize form modifications and web parts
 */
export const InitializeModifications = () => {
    let urlParts = Util.getUrlParts();
    let [list] = Object.keys(formModifications).filter(key => _spPageContextInfo.serverRequestPath.indexOf(key) !== -1);
    if (list) {
        if (formModifications[list].hasOwnProperty(urlParts[3])) {
            formModifications[list][urlParts[3]]();
        }
    }
    HandleQueryParams();
};
