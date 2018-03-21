export default class StatsField {
    public id: number;
    public title: string;
    public managedPropertyName: string;
    public dataType: string;

    constructor(id: number, title: string, managedPropertyName: string, dataType: string) {
        this.id = id;
        this.title = title;
        this.managedPropertyName = managedPropertyName;
        this.dataType = dataType.toLowerCase();
    }
}

