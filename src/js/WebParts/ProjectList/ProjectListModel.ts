import __ from "../../Resources";
import * as Util from "../../Util";

export interface IUserDetails {
    name: string;
    email: string;
    profileImageSrc: string;
}

export default class ProjectListModel {
    public Title: string;
    public Url: string;
    public Logo: string;
    public Phase: string;
    public ServiceArea: string;
    public Type: string;
    public Manager: string;
    public Owner: string;
    public Views: number;
    public LastModifiedTime: string;
    public RawObject: any;

    /**
     * Constructor
     */
    constructor() {
        // Empty constructor
    }

    public initFromSearchResponse(projectSearchResult, webSearchResult) {
        this.RawObject = projectSearchResult;
        this.Title = projectSearchResult.SiteTitle;
        this.Phase = projectSearchResult.RefinableString52;
        this.ServiceArea = projectSearchResult.RefinableString53;
        this.Type = projectSearchResult.RefinableString54;
        this.Manager = projectSearchResult.GtProjectManagerOWSUSER;
        this.Owner = projectSearchResult.GtProjectOwnerOWSUSER;
        this.LastModifiedTime = projectSearchResult.LastModifiedTime;

        this.Url = webSearchResult ? webSearchResult.Path : projectSearchResult.Path.split("/Lists")[0];
        this.Title = webSearchResult ? webSearchResult.Title : projectSearchResult.SiteTitle;
        this.Logo = webSearchResult && webSearchResult.SiteLogo ? webSearchResult.SiteLogo.replace("ICO-Site-Project-11", "ICO-Global-Project-11") : "";
        this.Views = webSearchResult && webSearchResult.ViewsLifeTime;

        return this;
    }

    /**
    * Get manager (GtProjectManagerOWSUSER)
    */
    public getManager(): IUserDetails {
        let email = "";
        let name = __.getResource("String_NotSet");
        if (this.Manager) {
            [email, name] = this.Manager.split(" | ");
        }
        const profileImageSrc = Util.userPhoto(email);
        return { name, email, profileImageSrc };
    }

    /**
     * Get owner (GtProjectOwnerOWSUSER)
     */
    public getOwner(): IUserDetails {
        let email = "";
        let name = __.getResource("String_NotSet");
        if (this.Owner) {
            [email, name] = this.Owner.split(" | ");
        }
        const profileImageSrc = Util.userPhoto(email);
        return { name, email, profileImageSrc };
    }

    /**
     * Get phase letter
     */
    public getPhaseLetter(): string {
        if (this.Phase) {
            return this.Phase.substring(0, 1).toUpperCase();
        }
        return null;
    }
}
