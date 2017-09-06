import { IBaseWebPartState } from "../@BaseWebPart";

export default interface IAnnouncementsState extends IBaseWebPartState {
    entries: any[];
    isLoading: boolean;
    showAnnouncement: any;
}
