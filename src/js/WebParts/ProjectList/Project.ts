export class Project {
    public Title: string;
    public Url: string;
    public Logo: string;
    public PhaseIcon: string;
    public Phase: string;
    public ServiceArea: string;
    public Type: string;
    public Manager: string;
    public Owner: string;
    public Views: number;

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
        this.PhaseIcon = this.getPhaseLetter() ? `${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/pp/img/ICO-Global-Phase-${this.getPhaseLetter()}.png` : "";
    }

    public getPhaseLetter(): string {
        if (this.Phase) {
            return this.Phase.substring(0, 1).toUpperCase();
        }
        return null;
    }
}


export default Project;
