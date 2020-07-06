//#region Imports
import * as React from 'react'
import __ from '../../../../../Resources'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import IErrorInformationViewProps from './IErrorInformationViewProps'
//#endregion

/**
 * Changing phase view
 */
export default class ErrorInformationView extends React.Component<IErrorInformationViewProps, {}> {
    public static displayName = 'ErrorInformationView';

    /**
     * Constructor
     *
     * @param {IErrorInformationViewProps} props Props
     */
    constructor(props: IErrorInformationViewProps) {
        super(props)
    }

    public render(): JSX.Element {
        return (
            <MessageBar messageBarType={MessageBarType.error}>{__.getResource('ProjectPhases_ChangePhaseErrorMessage')}</MessageBar>
        )
    }
}
