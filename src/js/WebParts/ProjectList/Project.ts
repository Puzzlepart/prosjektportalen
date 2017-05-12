export interface IProject {
    Title: string;
    Url: string;
    Logo: string;
    Phase: string;
    ServiceArea: string;
    Type: string;
    Manager: string;
    Owner: string;
    ViewsLifeTime: number;
}

export class Project implements IProject {
    public Title: string;
    public Url: string;
    public Logo: string;
    public Phase: string;
    public ServiceArea: string;
    public Type: string;
    public Manager: string;
    public Owner: string;
    public ViewsLifeTime: number;

    constructor({ Title, Path, SiteLogo, RefinableString52, RefinableString53, RefinableString54, GtProjectManagerOWSUSER, GtProjectOwnerOWSUSER, ViewsLifeTime }) {
        this.Title = Title;
        this.Url = Path;
        this.Logo = SiteLogo.replace("ICO-Site-Project-11", "ICO-Global-Project-11");
        this.Phase = RefinableString52;
        this.ServiceArea = RefinableString53;
        this.Type = RefinableString54;
        this.Manager = GtProjectManagerOWSUSER;
        this.Owner = GtProjectOwnerOWSUSER;
        this.ViewsLifeTime = ViewsLifeTime;
    }
}


export default Project;
