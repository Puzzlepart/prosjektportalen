export default class ProjectResource {
    public Path: string;
    public Title: string;
    public SiteTitle: string;
    public SPWebUrl: string;
    public ResourceUser: string;
    public ResourceRole: string;
    public StartDate: string;
    public EndDate: string;
    public ProjectPhase: string;

    constructor(data) {
        this.Path = data.Path;
        this.Title = data.Title;
        this.SiteTitle = data.SiteTitle;
        this.SPWebUrl = data.SPWebUrl;
        this.ResourceUser = data.RefinableString71;
        this.ResourceRole = data.RefinableString72;
        this.StartDate = data.GtStartDateOWSDATE;
        this.EndDate = data.GtEndDateOWSDATE;
        this.ProjectPhase = data.RefinableString52;
    }
}

