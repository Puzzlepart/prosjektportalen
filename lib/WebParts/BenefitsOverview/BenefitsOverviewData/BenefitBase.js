"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BenefitBase {
    constructor(result) {
        this.path = result.Path;
        this.webUrl = this.path.split("/Lists/")[0];
        this.title = result.Title;
        this.siteTitle = result.SiteTitle;
        this.id = parseInt(result.ListItemId, 10);
        this.webId = result.WebId;
    }
}
exports.BenefitBase = BenefitBase;
