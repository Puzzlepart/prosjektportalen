export default class DeliveryElement {
    public Path: string;
    public Title: string;
    public SiteTitle: string;
    public SPWebUrl: string;

    constructor(data) {
        this.Path = data.Path;
        this.Title = data.Title;
        this.SiteTitle = data.SiteTitle;
        this.SPWebUrl = data.SPWebUrl;
    }
}

