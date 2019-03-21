export default class ListConfig {
    SourceUrl: string;
    SourceList: string;
    DestinationList: string;
    DestinationLibrary: string;
    Fields: string[];
    Label: string;
    Default: boolean;
    /**
     * Constructor
     *
     * @param {any} item SharePoint list item
     * @param {string} fieldPrefix Prefix for fields
     */
    constructor(item: any, fieldPrefix: string);
}
