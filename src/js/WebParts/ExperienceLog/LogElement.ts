export default class LogElement {
    public Path: string;
    public Title: string;
    public SiteTitle: string;
    public SiteUrl: string;
    public Description: string;
    public LogType: string;
    public Responsible: string;
    public Consequence: string;
    public Recommendation: string;
    public Actors: string[];

    constructor(data: any) {
        this.Path = data.Path
        this.Title = data.Title
        this.SiteTitle = data.SiteTitle
        this.SiteUrl = data.Path.split('/Lists/')[0]
        this.Description = data.GtProjectLogDescriptionOWSMTXT
        this.LogType = data.GtProjectLogTypeOWSCHCS
        this.Responsible = data.GtProjectLogResponsibleOWSCHCS
        this.Consequence = data.GtProjectLogConsequenceOWSMTXT
        this.Recommendation = data.GtProjectLogRecommendationOWSMTXT
        this.Actors = data.GtProjectLogActorsOWSCHCM ? data.GtProjectLogActorsOWSCHCM.split(';#').filter((a: string) => a) : []
    }
}

