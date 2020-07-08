/* eslint-disable @typescript-eslint/camelcase */
import __ from '../../../../Resources'
import { IList } from 'sp-js-provisioning/lib/schema'
import { GtGainLookup, GtGainLookup_ID } from './SiteFields'

const MeasurementIndicators: IList = {
    Title: __.getResource('Lists_MeasurementIndicators_Title'),
    Description: '',
    Template: 100,
    ContentTypesEnabled: false,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
        ContentTypeID: '0x0100FF4E12223AF44F519AF40C441D05DED0',
    }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Fields: [
        GtGainLookup,
        GtGainLookup_ID,
    ],
    Views: [{
        Title: __.getResource('View_AllItems_DisplayName'),
        ViewFields: ['GtOrder', 'GtGainLookup', 'LinkTitle', 'GtStartValue', 'GtDesiredValue', 'GtMeasurementUnit'],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: `<OrderBy>
              <FieldRef Name="GtOrder" />
            </OrderBy>`,
        },
    }],
}

export default MeasurementIndicators
