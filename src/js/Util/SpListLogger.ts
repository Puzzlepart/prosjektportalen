import { Site } from "sp-pnp-js";

interface ILogEntry {
    Title: string;
}



export default class SpListLogger {
    public List: string;
    private SiteUrl: string;

    /**
     * Constructor
     *
     * @param {string} list SP list title
     */
    constructor(list = "Logg", siteUrl = _spPageContextInfo.siteAbsoluteUrl) {
        this.List = list;
        this.SiteUrl = siteUrl;
    }

    /**
     * Logs an entry to the SP list
     *
     * @param {ILogElement} entry Log entry
     */
    public log(entry: ILogEntry): void {
        const spList = new Site(this.SiteUrl).rootWeb.lists.getByTitle(this.List);
        spList.items.add(entry);
    }
}
