import __ from '../../../../Resources'
import { IList } from 'sp-js-provisioning/lib/schema'

const Stakeholders: IList = {
    Title: __.getResource('Lists_Stakeholders_Title'),
    Description: '',
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
        ContentTypeID: '0x010088578E7470CC4AA68D5663464831070202',
    }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Views: [{
        Title: __.getResource('View_AllItems_DisplayName'),
        ViewFields: ['LinkTitle', 'GtStakeholderGroup', 'GtStakeholderContext', 'GtStakeholderStrategy', 'GtStakeholderInterest', 'GtStakeholderInfluence', 'GtStakeholderInfluencePossibilty', 'GtStakeholderActions'],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: '',
        },
    }],
}

export default Stakeholders
