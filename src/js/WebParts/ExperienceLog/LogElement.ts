import { IQueryResult } from "./ExperienceLogSearch";

export class LogElement {
    public Path: string;
    public Title: string;
    public SiteTitle: string;
    public SPWebUrl: string;
    public Description: string;
    public Responsible: string;
    public Consequence: string;
    public Recommendation: string;
    public Actors: string;

    constructor(data: IQueryResult) {
        this.Path = data.Path;
        this.Title = data.Title;
        this.SiteTitle = data.SiteTitle;
        this.SPWebUrl = data.SPWebUrl;
        this.Description = data.GtProjectLogDescriptionOWSMTXT;
        this.Responsible = data.GtProjectLogResponsibleOWSCHCS;
        this.Consequence = data.GtProjectLogConsequenceOWSMTXT;
        this.Recommendation = data.GtProjectLogRecommendationOWSMTXT;
        this.Actors = data.GtProjectLogActorsOWSCHCM.split(";#").join(", ");
    }
}


export default LogElement;


