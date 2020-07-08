import { IBenefitsSearchResult } from './IBenefitsSearchResult'

export class BenefitBase {
    public path: string;
    public webUrl: string;
    public title: string;
    public siteTitle: string;
    public id: number;
    public webId: string;

    constructor(result: IBenefitsSearchResult) {
        this.path = result.Path
        this.webUrl = this.path.split('/Lists/')[0]
        this.title = result.Title !== 'DispForm.aspx' ? result.Title : ''
        this.siteTitle = result.SiteTitle
        this.id = parseInt(result.ListItemId, 10)
        this.webId = result.WebId
    }
}
