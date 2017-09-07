import * as Util from "../../Util";

interface IUserDetails {
    Name: string;
    EMail: string;
    Photo: string;
}

export default class Project {
    public Title: string;
    public Url: string;
    public Logo: string;
    public Phase: string;
    public ServiceArea: string;
    public Type: string;
    public Manager: string;
    public Owner: string;
    public Views: number;

    /**
     * Constructor
     */
    constructor({ Title, Path, SiteLogo, RefinableString52, RefinableString53, RefinableString54, GtProjectManagerOWSUSER, GtProjectOwnerOWSUSER, ViewsLifeTime }) {
        this.Title = Title;
        this.Url = Path;
        this.Logo = SiteLogo.replace("ICO-Site-Project-11", "ICO-Global-Project-11");
        this.Phase = RefinableString52;
        this.ServiceArea = RefinableString53;
        this.Type = RefinableString54;
        this.Manager = GtProjectManagerOWSUSER;
        this.Owner = GtProjectOwnerOWSUSER;
        this.Views = ViewsLifeTime;
    }

    /**
    * Get manager (GtProjectManagerOWSUSER) details
    */
    public getManagerDetails(): IUserDetails {
        const [EMail = "", Name = __("String_NotSet")] = this.Manager.split(" | ");
        const Photo = Util.userPhoto(EMail);
        return { Name, EMail, Photo };
    }

    /**
     * Get owner (GtProjectOwnerOWSUSER) details
     */
    public getOwnerDetails(): IUserDetails {
        const [EMail = "", Name = __("String_NotSet")] = this.Owner.split(" | ");
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
