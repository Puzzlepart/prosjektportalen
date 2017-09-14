import IChecklistItem from "../../../IChecklistItem";

export default interface IInitialViewProps {
    className?: string;
    isLoading: boolean;
    currentChecklistItem: IChecklistItem;
    nextCheckPointAction: (statusValue: string, commentsValue: string, updateStatus: boolean) => void;
    commentMinLength?: number;
    commentPlaceholder?: string;
    commentClassName?: string;
    commentStyle?: React.CSSProperties;
}

export const InitialViewDefaultProps: Partial<IInitialViewProps> = {
    className: "inner",
    commentMinLength: 4,
    commentPlaceholder: __("String_Comment"),
    commentClassName: "ms-TextField-field",
    commentStyle: {
        marginTop: 15,
        height: 200,
        padding: 10,
        resize: "none",
        width: "90%",
    },
};
