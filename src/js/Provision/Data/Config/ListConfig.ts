export default class ListConfig {
    public Id: number;
    public SourceUrl: string;
    public SourceList: string;
    public DestinationList: string;
    public DestinationLibrary: string;
    public Fields: string[];
    public Label: string;
    public Default: boolean;

    /**
     * Constructor
     *
     * @param {any} item SharePoint list item
     */
    constructor(item: any) {
        this.Id = item.Id;
        this.SourceUrl = item.GtLccSourceUrl;
        this.SourceList = item.GtLccSourceList;
        this.DestinationList = item.GtLccDestinationList;
        this.DestinationLibrary = item.GtLccDestinationLibrary;
        this.Fields = item.GtLccFields.split(",");
        this.Label = item.GtLccLabel;
        this.Default = item.GtLccDefault;
    }
}
