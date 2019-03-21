"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeliveryElement {
    constructor(data) {
        this.Path = data.Path;
        this.Title = data.Title;
        this.SiteTitle = data.SiteTitle;
        this.SPWebUrl = data.SPWebUrl;
        this.ProductDescription = data.GtProductDescriptionOWSMTXT;
        this.ProductStartTime = data.GtProductStartTimeOWSDATE;
        this.ProductEndTime = data.GtProductEndTimeOWSDATE;
        this.ProductStatus = data.GtProductStatusOWSCHCS;
        this.ProductStatusComment = data.GtProductStatusCommentOWSMTXT;
    }
}
exports.default = DeliveryElement;
