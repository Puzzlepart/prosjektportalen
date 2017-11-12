import RESOURCE_MANAGER from "../../@localization";
import * as Util from "../../Util";

export interface IUserDetails {
    Name: string;
    EMail: string;
    Photo: string;
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
    * Get manager (GtProjectManagerOWSUSER) details
    */
    public getManagerDetails(): IUserDetails {
        let EMail = "";
        let Name = RESOURCE_MANAGER.getResource("String_NotSet");
        if (this.Manager) {
            const managerSplit = this.Manager.split(" | ");
            EMail = managerSplit[0], Name = managerSplit[1];
        }
        const Photo = Util.userPhoto(EMail);
        return { Name, EMail, Photo };
    }

    /**
     * Get owner (GtProjectOwnerOWSUSER) details
     */
    public getOwnerDetails(): IUserDetails {
        let EMail = "";
        let Name = RESOURCE_MANAGER.getResource("String_NotSet");
        if (this.Owner) {
            const ownerSplit = this.Owner.split(" | ");
            EMail = ownerSplit[0], Name = ownerSplit[1];
        }
        const Photo = Util.userPhoto(EMail);
        return { Name, EMail, Photo };
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
