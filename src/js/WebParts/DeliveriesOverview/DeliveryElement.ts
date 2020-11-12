export default class DeliveryElement {
    public Path: string;
    public Title: string;
    public SiteTitle: string;
    public SiteUrl: string;
    public ProductDescription: string;
    public ProductStartTime: string;
    public ProductEndTime: string;
    public ProductStatus: string;
    public ProductStatusComment: string;

    constructor(data) {
        this.Path = data.Path
        this.Title = data.Title
        this.SiteTitle = data.SiteTitle
        this.SiteUrl = data.Path.split('/Lists/')[0]
        this.ProductDescription = data.GtProductDescriptionOWSMTXT
        this.ProductStartTime = data.GtProductStartTimeOWSDATE
        this.ProductEndTime = data.GtProductEndTimeOWSDATE
        this.ProductStatus = data.GtProductStatusOWSCHCS
        this.ProductStatusComment = data.GtProductStatusCommentOWSMTXT
    }
}

