import RESOURCE_MANAGER from "../../../../../@localization";
import IChecklistItem from "../../../IChecklistItem";

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
    className: "inner",
    commentMinLength: 4,
    commentLabel: RESOURCE_MANAGER.getResource("String_Comment"),
};
