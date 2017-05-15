export interface IWebInfo {
    Id: number;
    ServerRelativeUrl: string;
    Title: string;
    Created: string;
}

interface ILatestProjectsState {
    webinfos: IWebInfo[];
    isLoading: boolean;
}

export default LatestProjectState;
