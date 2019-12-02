export default class ProjectType {
    public title: string;
    public templateId: number;
    public extensionIds: number[];
    public listContentIds: number[];

    /**
     * Constructor
     *
     * @param {any} item SharePoint list item
     */
    constructor(item: any) {
        this.title = item.Title;
        this.templateId = item.GtTemplateLookupId;
        this.extensionIds = item.GtExtensionsLookupId.results;
        this.listContentIds = item.GtListContentsLookupId.results;
    }
}
