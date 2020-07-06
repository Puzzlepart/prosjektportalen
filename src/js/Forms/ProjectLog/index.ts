import { IBaseFormModifications } from '../Base'

const _: IBaseFormModifications = {
    NewForm: () => {
        const select = document.querySelectorAll('select')
        select.forEach(ele => {
            const options = ele.querySelectorAll('option')
            if (options.length === 0) {
                (ele.parentNode.parentNode.parentNode as any).style.display = 'none'
            }
        })
    },
    EditForm: () => {
        // EditForm
    },
    DispForm: () => {
        // DispForm
    },
}

export default _
