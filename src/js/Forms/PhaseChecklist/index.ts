import __ from '../../Resources'
import { IBaseFormModifications } from '../Base'
import * as FormUtil from '../FormUtils'

const _: IBaseFormModifications = {
    NewForm: () => {
        // NewForm
    },
    EditForm: () => {
        FormUtil.overridePreSaveAction(() => {
            let formValidation: any = document.querySelector('.ms-formvalidation')
            if (formValidation) {
                formValidation.style.display = 'none'
            }
            const status = (document.querySelector('select[id*=\'GtChecklistStatus\']') as any).value
            if (status === __.getResource('Choice_GtChecklistStatus_NotRelevant')) {
                const comment: any = document.querySelector('textarea[id*=\'GtComment\']')
                if (comment.value === '') {
                    formValidation = document.createElement('div')
                    formValidation.classList.add('ms-formvalidation')
                    formValidation.innerText = __.getResource('SiteFields_GtChecklistStatus_FormValidation_NotRelevant')
                    comment.parentNode.insertBefore(formValidation, comment.nextSibling)
                    return false
                }
            }
            return true
        })
    },
    DispForm: () => {
        // DispForm
    },
}

export default _
