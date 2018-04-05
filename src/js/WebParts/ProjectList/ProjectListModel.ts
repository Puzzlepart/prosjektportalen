import RESOURCE_MANAGER from "../../@localization";
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
    public RawObject: any;

    /**
     * Constructor
     */
    constructor() {
        // Empty constructor
    }

    public initFromSearchResponse(obj) {
        this.RawObject = obj;
        this.Title = obj.Title;
        this.Url = obj.Path;
        this.Logo = obj.SiteLogo ? obj.SiteLogo.replace("ICO-Site-Project-11", "ICO-Global-Project-11") : "";
        this.Phase = obj.RefinableString52;
        this.ServiceArea = obj.RefinableString53;
        this.Type = obj.RefinableString54;
        this.Manager = obj.GtProjectManagerOWSUSER;
        this.Owner = obj.GtProjectOwnerOWSUSER;
        this.Views = obj.ViewsLifeTime;
        return this;
    }

    /**
    * Get manager (GtProjectManagerOWSUSER)
    */
    public getManager(): IUserDetails {
        let email = "";
        let name = RESOURCE_MANAGER.getResource("String_NotSet");
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
        let name = RESOURCE_MANAGER.getResource("String_NotSet");
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
