export default class StatsFieldConfiguration {
    id: number;
    title: string;
    managedPropertyName: string;
    dataType: string;
    /**
     * Constructor
     *
     * @param {number} id Item ID
     * @param {string} title Title
     * @param {string} managedPropertyName Managed property name
     * @param {string} dataType Data type
     */
    constructor(id: number, title: string, managedPropertyName: string, dataType: string);
}
