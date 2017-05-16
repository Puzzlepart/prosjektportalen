import { IQueryResult } from "./Search";

export class Project {
    public Title: string;
    public Url: string;
    public Logo: string;
    public Phase: string;
    public ServiceArea: string;
    public Type: string;
    public Manager: string;
    public Owner: string;
    public Views: number;

    constructor(data: IQueryResult) {
        this.Title = data.Title;
        this.Url = data.Path;
        this.Logo = data.SiteLogo.replace("ICO-Site-Project-11", "ICO-Global-Project-11");
        this.Phase = data.RefinableString52;
        this.ServiceArea = data.RefinableString53;
        this.Type = data.RefinableString54;
        this.Manager = data.GtProjectManagerOWSUSER;
        this.Owner = data.GtProjectOwnerOWSUSER;
        this.Views = parseInt(data.ViewsLifeTime, 10);
    }
}


export default Project;
