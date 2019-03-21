import { IBaseWebPartState } from "../@BaseWebPart";
export default interface IAnnouncementsState extends IBaseWebPartState {
    entries?: any[];
    showAnnouncement?: any;
    elementToToggle?: HTMLDivElement;
}
