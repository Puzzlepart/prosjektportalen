/// <reference types="react" />
import IChecklistItem from "../../../ProjectPhasesData/IChecklistItem";
export default interface IInitialViewProps {
    className?: string;
    isLoading: boolean;
    currentChecklistItem: IChecklistItem;
    nextCheckPointAction: (statusValue: string, commentsValue: string, updateStatus: boolean) => void;
    commentMinLength?: number;
    commentLabel?: string;
    commentStyle?: React.CSSProperties;
}
export declare const InitialViewDefaultProps: Partial<IInitialViewProps>;
