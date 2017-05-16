interface ICreationModalProps {
    show: boolean;
    onDismiss: any;
    isBlocking: boolean;
    isDarkOverlay?: boolean;
    title: string;
    progressLabel: string;
    progressDescription: string;
    error?: any;
}

export default ICreationModalProps;
