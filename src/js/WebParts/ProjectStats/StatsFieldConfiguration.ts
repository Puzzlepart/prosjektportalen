export default class StatsFieldConfiguration {
    public id: number;
    public title: string;
    public managedPropertyName: string;
    public dataType: string;

    /**
     * Constructor
     *
     * @param {number} id Item ID
     * @param {string} title Title
     * @param {string} managedPropertyName Managed property name
     * @param {string} dataType Data type
     */
    constructor(id: number, title: string, managedPropertyName: string, dataType: string) {
        this.id = id;
        this.title = title;
        this.managedPropertyName = managedPropertyName;
        this.dataType = dataType.toLowerCase();
    }
}
