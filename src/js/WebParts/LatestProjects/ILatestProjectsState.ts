import { IBaseWebPartState } from "../@BaseWebPart";

export interface IWebInfo {
    Id: number;
    ServerRelativeUrl: string;
    Title: string;
    Created: string;
}

export default interface ILatestProjectsState extends IBaseWebPartState {
    webinfos?: IWebInfo[];
    isLoading?: boolean;
}
