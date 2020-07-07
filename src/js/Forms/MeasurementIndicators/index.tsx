import __ from '../../Resources'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IBaseFormModifications } from '../Base'
import * as FormUtil from '../FormUtils'
import { ChromeTitle } from '../../WebParts/@Components'

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
        const id = 'pp-next-step'
        const container = FormUtil.insertFormContainer(id)
        ReactDOM.render((<div>
           <ChromeTitle title={__.getResource('MeasurementIndicators_NextStep_Title')} />
           <p>​​{__.getResource('MeasurementIndicators_NextStep_Text')}.</p>
        </div>), container)
    },
}

export default _
