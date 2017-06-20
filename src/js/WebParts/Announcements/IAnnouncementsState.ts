interface IAnnouncementsState {
    entries: any[];
    isLoading: boolean;
    showAnnouncement: any;
}

export const AnnouncementsInitialState = {
    entries: null,
    isLoading: true,
    showAnnouncement: null,
};

export default IAnnouncementsState;
