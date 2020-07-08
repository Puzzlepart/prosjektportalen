import __ from '../../../../Resources'
import { IList } from 'sp-js-provisioning/lib/schema'

const ResourceAllocation: IList = {
    Title: __.getResource('Lists_ResourceAllocation_Title'),
    Description: '',
    Template: 100,
    ContentTypesEnabled: false,
    RemoveExistingContentTypes: true,
    AdditionalSettings: { EnableVersioning: true },
    Fields: [
        `<Field ID="{fa564e0f-0c70-4ab9-b863-0177e6ddd247}" Type="Text" Name="Title" StaticName="Title" DisplayName="${__.getResource('SiteFields_LinkTitleResourceAllocation_DisplayName')}" />`,
    ],
    FieldRefs: [{
        ID: 'fa564e0f-0c70-4ab9-b863-0177e6ddd247',
        DisplayName: __.getResource('SiteFields_LinkTitleResourceAllocation_DisplayName'),
        Required: false,
        Hidden: false,
    }],
    ContentTypeBindings: [{ ContentTypeID: '0x010088578E7470CC4AA68D5663464831070209' }],
    Views: [{
        Title: __.getResource('View_AllItems_DisplayName'),
        ViewFields: ['LinkTitle', 'GtResourceUser', 'GtResourceRole', 'GtStartDate', 'GtEndDate', 'GtResourceLoad', 'GtResourceAbsenceComment', 'Modified'],
        AdditionalSettings: {
            RowLimit: 100,
            Paged: true,
            ViewQuery: `<OrderBy>
              <FieldRef Name="GtEndDate" Ascending="FALSE" />
            </OrderBy>`,
        },
    }],
}

export default ResourceAllocation
