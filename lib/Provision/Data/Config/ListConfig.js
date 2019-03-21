"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListConfig {
    /**
     * Constructor
     *
     * @param {any} item SharePoint list item
     * @param {string} fieldPrefix Prefix for fields
     */
    constructor(item, fieldPrefix) {
        this.SourceUrl = item[`${fieldPrefix}SourceUrl`];
        this.SourceList = item[`${fieldPrefix}SourceList`];
        this.DestinationList = item[`${fieldPrefix}DestinationList`];
        this.DestinationLibrary = item[`${fieldPrefix}DestinationLibrary`];
        this.Fields = item[`${fieldPrefix}Fields`].split(",");
        this.Label = item[`${fieldPrefix}Label`];
        this.Default = item[`${fieldPrefix}Default`];
    }
}
exports.default = ListConfig;
