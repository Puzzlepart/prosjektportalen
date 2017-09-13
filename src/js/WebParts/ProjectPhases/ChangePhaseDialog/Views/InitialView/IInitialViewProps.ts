import IChecklistItem from "../../../IChecklistItem";

export default interface IInitialViewProps {
    isLoading: boolean;
    currentChecklistItem: IChecklistItem;
    nextCheckPointAction: (statusValue: string, commentsValue: string, updateStatus: boolean) => void;
    commentMinLength: number;
}

export const InitialViewDefaultProps: Partial<IInitialViewProps> = {
    commentMinLength: 4,
};
