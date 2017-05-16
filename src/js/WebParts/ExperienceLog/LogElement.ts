import { IQueryResult } from "./Search";

export class LogElement {
    public Title: string;
    public SiteTitle: string;
    public Description: string;
    public Responsible: string;
    public Consequence: string;
    public Recommendation: string;
    public Actors: string;

    constructor(data: IQueryResult) {
        this.Title = data.Title;
        this.SiteTitle = data.SiteTitle;
        this.Description = data.GtProjectLogDescriptionOWSMTXT;
        this.Responsible = data.GtProjectLogResponsibleOWSCHCS;
        this.Consequence = data.GtProjectLogConsequenceOWSMTXT;
        this.Recommendation = data.GtProjectLogRecommendationOWSMTXT;
        this.Actors = data.GtProjectLogActorsOWSCHCM.split(";#").join(", ");
    }
}


export default LogElement;


