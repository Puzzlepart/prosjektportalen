//#region Imports
import * as React from 'react'
import __ from '../../../../Resources'
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar'
import { View, InitialView, SummaryView, ChangingPhaseView, GateApprovalView, ErrorInformationView } from '../Views'
import IBodyProps from './IBodyProps'
//#endregion

export const Body = (props: IBodyProps) => {
    switch (props.currentView) {
        case View.Initial: {
            const currentChecklistItem = props.openCheckListItems[props.currentIdx]
            return (
                <InitialView
                    isLoading={props.isLoading}
                    currentChecklistItem={currentChecklistItem}
                    nextCheckPointAction={props.nextCheckPointAction} />
            )
        }
        case View.Summary: {
            return (
                <SummaryView activePhase={props.activePhase} />
            )
        }
        case View.ChangingPhase: {
            return (
                <ChangingPhaseView newPhase={props.newPhase} />
            )
        }
        case View.GateApproval: {
            return (
                <GateApprovalView
                    onCloseDialog={props.onCloseDialog}
                    onChangePhaseDialogReturnCallback={props.onChangePhaseDialogReturnCallback} />
            )
        }
        case View.Confirm: {
            if (props.activePhase && props.activePhase.IsIncremental) {
                return (
                    <div className='inner'>
                        <MessageBar>
                            <p>{String.format(__.getResource('ProjectPhases_CurrentPhaseIncremental'), props.activePhase.Name)}</p>
                            <p>{String.format(__.getResource('ProjectPhases_RestartPhaseOrContinue'), props.nextPhase.Name)}</p>
                        </MessageBar>
                    </div>
                )
            }
            return <div className='inner'></div>
        }
        case View.ErrorInformation: {
            return <ErrorInformationView />
        }
        default: {
            return <div className='inner'></div>
        }
    }
}
