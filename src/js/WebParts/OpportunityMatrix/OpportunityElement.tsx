import * as React from 'react'
import __ from '../../Resources'
import { ModalLink } from '../@Components'

export interface IOpportunityElementProps {
    item: any;
    style?: React.CSSProperties;
}

const OpportunityElement = ({ item: { ID, Title }, style }: IOpportunityElementProps) => {
    const dispFormUrl = `${_spPageContextInfo.webAbsoluteUrl}/${__.getResource('DefaultView_Uncertainties_Url').replace('AllItems', 'DispForm')}?ID=${ID}`
    return (
        <div
            className='opportunity-matrix-element'
            title={Title}
            style={style}>
            <ModalLink
                label={ID}
                url={dispFormUrl}
                options={{ HideRibbon: true }} />
        </div>
    )
}

export default OpportunityElement
