import { View } from "../Views";

export default interface IFooterProps {
    currentView: View;
    isLoading: boolean;
    onConfirmPhaseChange: () => Promise<void>;
    onCloseDialog: (e, reload?: boolean) => void;
    changeView: (view: View) => void;
}

