"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogElement {
    constructor(data) {
        this.Path = data.Path;
        this.Title = data.Title;
        this.SiteTitle = data.SiteTitle;
        this.SPWebUrl = data.SPWebUrl;
        this.Description = data.GtProjectLogDescriptionOWSMTXT;
        this.LogType = data.GtProjectLogTypeOWSCHCS;
        this.Responsible = data.GtProjectLogResponsibleOWSCHCS;
        this.Consequence = data.GtProjectLogConsequenceOWSMTXT;
        this.Recommendation = data.GtProjectLogRecommendationOWSMTXT;
        this.Actors = data.GtProjectLogActorsOWSCHCM ? data.GtProjectLogActorsOWSCHCM.split(";#").filter((a) => a) : [];
    }
}
exports.default = LogElement;
