import { IBaseWebPartState } from "../@BaseWebPart";

export default interface IQuickLinksState extends IBaseWebPartState {
    links?: any[];
    isLoading?: boolean;
}

export const QuickLinksInitialState: Partial<IQuickLinksState> = {
    links: null,
    isLoading: true,
};
