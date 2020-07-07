import * as React from 'react'
import __ from '../../../../Resources'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { PhaseModel } from '../../ProjectPhasesData'

export interface IGoToChecklistLinkProps {
    phase: PhaseModel;
}

function generateGoToChecklistLink(phase: PhaseModel) {
    if (phase.TaxonomyHiddenListId) {
        return `${phase.Checklist.defaultViewUrl}?useFiltersInViewXml=1&FilterField1=GtProjectPhase&FilterValue1=${phase.TaxonomyHiddenListId}&FilterType1=Counter&FilterLookupId1=1`
    } else {
        return `${phase.Checklist.defaultViewUrl}?FilterField1=GtProjectPhase&FilterValue1=${encodeURIComponent(phase.Name)}`
    }
}

const GoToChecklistLink = (props: IGoToChecklistLinkProps) => {
    return (
        <li>
            <a href={generateGoToChecklistLink(props.phase)}>
                <Icon iconName='BulletedList' />
                <span style={{ marginLeft: 5 }}>{__.getResource('ProjectPhases_GoToChecklist')}</span>
            </a>
        </li>
    )
}

export default GoToChecklistLink
