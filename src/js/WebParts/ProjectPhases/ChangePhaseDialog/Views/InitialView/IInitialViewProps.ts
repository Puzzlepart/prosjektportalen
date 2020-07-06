import __ from '../../../../../Resources'
import IChecklistItem from '../../../ProjectPhasesData/IChecklistItem'

export default interface IInitialViewProps {
    className?: string;
    isLoading: boolean;
    currentChecklistItem: IChecklistItem;
    nextCheckPointAction: (statusValue: string, commentsValue: string, updateStatus: boolean) => void;
    commentMinLength?: number;
    commentLabel?: string;
    commentStyle?: React.CSSProperties;
}

export const InitialViewDefaultProps: Partial<IInitialViewProps> = {
    className: 'inner',
    commentMinLength: 4,
    commentLabel: __.getResource('String_Comment'),
}
