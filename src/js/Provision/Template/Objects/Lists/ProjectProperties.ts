import __ from '../../../../Resources'
import { IList } from 'sp-js-provisioning/lib/schema'

const ProjectProperties: IList = {
    Title: __.getResource('Lists_ProjectProperties_Title'),
    Description: '',
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    AdditionalSettings: {
        EnableVersioning: true,
        OnQuickLaunch: false,
     },
    FieldRefs: [{
        ID: 'fa564e0f-0c70-4ab9-b863-0177e6ddd247',
        Required: false,
        Hidden: true,
    }],
    ContentTypeBindings: [{ ContentTypeID: __.getResource('ContentTypes_Prosjektegenskaper_ContentTypeId') }],
}

export default ProjectProperties
