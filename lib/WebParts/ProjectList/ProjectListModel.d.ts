export interface IUserDetails {
    name: string;
    email: string;
    profileImageSrc: string;
}
export default class ProjectListModel {
    Title: string;
    Url: string;
    Logo: string;
    Phase: string;
    ServiceArea: string;
    Type: string;
    Manager: string;
    Owner: string;
    LastModifiedTime: string;
    RawObject: any;
    /**
     * Constructor
     */
    constructor();
    initFromSearchResponse(projectSearchResult: any, webSearchResult: any): this;
    /**
    * Get manager (GtProjectManagerOWSUSER)
    */
    getManager(): IUserDetails;
    /**
     * Get owner (GtProjectOwnerOWSUSER)
     */
    getOwner(): IUserDetails;
    /**
     * Get phase letter
     */
    getPhaseLetter(): string;
}
