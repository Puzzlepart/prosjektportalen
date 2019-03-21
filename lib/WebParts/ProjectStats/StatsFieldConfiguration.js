"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatsFieldConfiguration {
    /**
     * Constructor
     *
     * @param {number} id Item ID
     * @param {string} title Title
     * @param {string} managedPropertyName Managed property name
     * @param {string} dataType Data type
     */
    constructor(id, title, managedPropertyName, dataType) {
        this.id = id;
        this.title = title;
        this.managedPropertyName = managedPropertyName;
        this.dataType = dataType.toLowerCase();
    }
}
exports.default = StatsFieldConfiguration;
