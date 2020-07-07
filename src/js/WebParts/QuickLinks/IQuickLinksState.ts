import { IBaseWebPartState } from '../@BaseWebPart'

export default interface IQuickLinksState extends IBaseWebPartState {
    links?: any[];
    elementToToggle?: HTMLDivElement;
}

