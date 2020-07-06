import { PhaseModel } from '../ProjectPhasesData'
import { View } from './Views'

export default interface IChangePhaseDialogState {
    activePhase?: PhaseModel;
    currentIdx?: number;
    isLoading?: boolean;
    currentView?: View;
}

