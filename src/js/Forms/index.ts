import __ from '../Resources'
import * as Util from '../Util'
import { IBaseFormModifications } from './Base'
import HandleQueryParams from './HandleQueryParams'

const formModifications: { [key: string]: IBaseFormModifications } = {}
formModifications[__.getResource('Lists_ProjectLog_Url')] = require('./ProjectLog').default
formModifications[__.getResource('Lists_MeetingCalendar_Url')] = require('./MeetingCalendar').default
formModifications[__.getResource('Lists_PhaseChecklist_Url')] = require('./PhaseChecklist').default
formModifications[__.getResource('Lists_ChangeAnalysis_Url')] = require('./ChangeAnalysis').default
formModifications[__.getResource('Lists_BenefitsAnalysis_Url')] = require('./BenefitsAnalysis').default
formModifications[__.getResource('Lists_MeasurementIndicators_Url')] = require('./MeasurementIndicators').default
formModifications[__.getResource('Lists_BenefitsFollowup_Url')] = require('./BenefitsFollowup').default
formModifications[__.getResource('Lists_BenefitsFollowup_WrongSpelling_Url')] = require('./BenefitsFollowup').default

/**
 * Initialize form modifications and web parts
 */
export const InitializeModifications = () => {
    const urlParts = Util.getUrlParts()
    const [list] = Object.keys(formModifications).filter(key => _spPageContextInfo.serverRequestPath.indexOf(key) !== -1)
    if (list) {
        if (formModifications[list].hasOwnProperty(urlParts[3])) {
            formModifications[list][urlParts[3]]()
        }
    }
    HandleQueryParams()
}