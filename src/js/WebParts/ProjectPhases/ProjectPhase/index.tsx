import * as React from 'react'
import ProjectPhaseIcon, { IProjectPhaseIconProps } from './ProjectPhaseIcon'
import ProjectPhaseCallout, { IProjectPhaseCalloutProps } from './ProjectPhaseCallout'
import IProjectPhaseProps from './IProjectPhaseProps'

/**
 * Project Phase
 *
 * @param {IProjectPhaseProps} param0 Props
 */
const ProjectPhase = ({ phase, phaseIterations, requestedPhase, classList, changePhaseEnabled, restartPhaseEnabled, onRestartPhaseHandler, onChangePhaseHandler }: IProjectPhaseProps) => {
    const selected = classList.indexOf('selected') !== -1
    const projectPhaseIconProps: IProjectPhaseIconProps = { phase, phaseIterations, classList }
    const projectPhaseCalloutProps: IProjectPhaseCalloutProps = { phase, requestedPhase, selected, changePhaseEnabled, restartPhaseEnabled, onRestartPhaseHandler, onChangePhaseHandler }
    return (
        <li className={classList.join(' ')}>
            <ProjectPhaseIcon { ...projectPhaseIconProps } />
            <ProjectPhaseCallout { ...projectPhaseCalloutProps } />
        </li>
    )
}

export default ProjectPhase
export { IProjectPhaseProps }

