interface IQuickLinksState {
    links?: any[];
    isLoading?: boolean;
}

export const QuickLinksInitialState: Partial<IQuickLinksState> = {
    links: null,
    isLoading: true,
};

export default IQuickLinksState;
