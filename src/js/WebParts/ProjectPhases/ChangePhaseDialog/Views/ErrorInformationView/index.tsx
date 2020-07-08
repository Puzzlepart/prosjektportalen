//#region Imports
import * as React from 'react'
import __ from '../../../../../Resources'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
//#endregion

/**
 * Changing phase view
 */
export default class ErrorInformationView extends React.Component<{}, {}> {
    public static displayName = 'ErrorInformationView';

    /**
     * Constructor
     *
     * @param {{}} props Props
     */
    constructor(props: {}) {
        super(props)
    }

    public render(): JSX.Element {
        return (
            <MessageBar messageBarType={MessageBarType.error}>{__.getResource('ProjectPhases_ChangePhaseErrorMessage')}</MessageBar>
        )
    }
}
