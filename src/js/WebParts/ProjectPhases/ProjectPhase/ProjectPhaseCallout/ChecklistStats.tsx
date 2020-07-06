import * as React from 'react'
import __ from '../../../../Resources'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { PhaseModel } from '../../ProjectPhasesData'

const GetStatusIcon = (index: number) => {
    switch (index) {
        case 0:
            return 'CheckMark'
        case 1:
            return 'ErrorBadge'
        case 2:
            return 'CircleRing'
    }
}

export interface IChecklistStatsProps {
    phase: PhaseModel;
}

const ChecklistStats = ({ phase }: IChecklistStatsProps) => {
    const { stats } = phase.Checklist
    return (
        <ul>
            {Object.keys(stats).map((c, index) => (
                <li key={index} style={{ paddingTop: '5px' }}>
                    <Icon iconName={GetStatusIcon(index)} /> <span>{stats[c]} {c} {__.getResource('ProjectPhases_Checkpoints')}.</span>
                </li>
            ))}
        </ul>
    )
}

export default ChecklistStats
