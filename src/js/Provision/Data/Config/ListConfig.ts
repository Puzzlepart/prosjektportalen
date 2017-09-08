export default class ListConfig {
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
     * @param {string} fieldPrefix Prefix for fields
     */
    constructor(item, fieldPrefix: string) {
        this.SourceUrl = item[`${fieldPrefix}SourceUrl`];
        this.SourceList = item[`${fieldPrefix}SourceList`];
        this.DestinationList = item[`${fieldPrefix}DestinationList`];
        this.DestinationLibrary = item[`${fieldPrefix}DestinationLibrary`];
        this.Fields = item[`${fieldPrefix}Fields`].split(",");
        this.Label = item[`${fieldPrefix}Label`];
        this.Default = item[`${fieldPrefix}Default`];
    }
}
