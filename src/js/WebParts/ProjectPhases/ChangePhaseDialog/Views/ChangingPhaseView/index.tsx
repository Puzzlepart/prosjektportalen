//#region Imports
import * as React from 'react'
import __ from '../../../../../Resources'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator'
import IChangingPhaseViewProps from './IChangingPhaseViewProps'
//#endregion

/**
 * Changing phase view
 */
export default class ChangingPhaseView extends React.Component<IChangingPhaseViewProps, {}> {
    public static displayName = 'ChangingPhaseView';

    /**
     * Constructor
     *
     * @param {IChangingPhaseViewProps} props Props
     */
    constructor(props: IChangingPhaseViewProps) {
        super(props)
    }

    public render(): JSX.Element {
        let progressResKey
        // eslint-disable-next-line default-case
        switch (this.props.newPhase.Type) {
            case 'Gate': progressResKey = 'ProjectPhases_ChangingGate'
                break
            case 'Default': progressResKey = 'ProjectPhases_ChangingPhase'
                break
        }
        const [progressLabel, progressDescription] = __.getResource(progressResKey).split(',')
        return (
            <ProgressIndicator
                label={progressLabel}
                description={String.format(progressDescription, this.props.newPhase.Name)} />
        )
    }
}
