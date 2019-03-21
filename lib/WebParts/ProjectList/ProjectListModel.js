"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const Util = require("../../Util");
class ProjectListModel {
    /**
     * Constructor
     */
    constructor() {
        // Empty constructor
    }
    initFromSearchResponse(projectSearchResult, webSearchResult) {
        this.RawObject = projectSearchResult;
        this.Title = projectSearchResult.SiteTitle;
        this.Phase = projectSearchResult.RefinableString52;
        this.ServiceArea = projectSearchResult.RefinableString53;
        this.Type = projectSearchResult.RefinableString54;
        this.Manager = projectSearchResult.GtProjectManagerOWSUSER;
        this.Owner = projectSearchResult.GtProjectOwnerOWSUSER;
        this.LastModifiedTime = projectSearchResult.LastModifiedTime;
        this.Url = webSearchResult ? webSearchResult.Path : projectSearchResult.Path.split("/Lists")[0];
        this.Title = webSearchResult ? webSearchResult.Title : projectSearchResult.SiteTitle;
        this.Logo = webSearchResult && webSearchResult.SiteLogo ? webSearchResult.SiteLogo.replace("ICO-Site-Project-11", "ICO-Global-Project-11") : "";
        return this;
    }
    /**
    * Get manager (GtProjectManagerOWSUSER)
    */
    getManager() {
        let email = "";
        let name = Resources_1.default.getResource("String_NotSet");
        if (this.Manager) {
            [email, name] = this.Manager.split(" | ");
        }
        const profileImageSrc = Util.userPhoto(email);
        return { name, email, profileImageSrc };
    }
    /**
     * Get owner (GtProjectOwnerOWSUSER)
     */
    getOwner() {
        let email = "";
        let name = Resources_1.default.getResource("String_NotSet");
        if (this.Owner) {
            [email, name] = this.Owner.split(" | ");
        }
        const profileImageSrc = Util.userPhoto(email);
        return { name, email, profileImageSrc };
    }
    /**
     * Get phase letter
     */
    getPhaseLetter() {
        if (this.Phase) {
            return this.Phase.substring(0, 1).toUpperCase();
        }
        return null;
    }
}
exports.default = ProjectListModel;
