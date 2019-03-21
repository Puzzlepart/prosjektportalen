"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../Resources");
const Util = require("../Util");
const HandleQueryParams_1 = require("./HandleQueryParams");
const formModifications = {};
formModifications[Resources_1.default.getResource("Lists_ProjectLog_Url")] = require("./ProjectLog").default;
formModifications[Resources_1.default.getResource("Lists_MeetingCalendar_Url")] = require("./MeetingCalendar").default;
formModifications[Resources_1.default.getResource("Lists_PhaseChecklist_Url")] = require("./PhaseChecklist").default;
formModifications[Resources_1.default.getResource("Lists_ChangeAnalysis_Url")] = require("./ChangeAnalysis").default;
formModifications[Resources_1.default.getResource("Lists_BenefitsAnalysis_Url")] = require("./BenefitsAnalysis").default;
/**
 * Initialize form modifications and web parts
 */
exports.InitializeModifications = () => {
    let urlParts = Util.getUrlParts();
    let [list] = Object.keys(formModifications).filter(key => _spPageContextInfo.serverRequestPath.indexOf(key) !== -1);
    if (list) {
        if (formModifications[list].hasOwnProperty(urlParts[3])) {
            formModifications[list][urlParts[3]]();
        }
    }
    HandleQueryParams_1.default();
};
