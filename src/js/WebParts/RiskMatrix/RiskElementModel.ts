import RESOURCE_MANAGER from "../../Resources";

export default class RiskElementModel {
    public id: string;
    public title: string;
    public probability: number;
    public consequence: number;
    public probabilityPostAction: number;
    public consequencePostAction: number;
    public url: string;

    constructor(id: string, title: string, probability: string, consequence: string, probabilityPostAction: string, consequencePostAction: string, url?: string) {
        this.id = id;
        this.title = title;
        this.probability = parseInt(probability, 10);
        this.consequence = parseInt(consequence, 10);
        this.probabilityPostAction = parseInt(probabilityPostAction, 10);
        this.consequencePostAction = parseInt(consequencePostAction, 10);
        if (url) {
            this.url = url;
        } else {
            this.url = `${_spPageContextInfo.webAbsoluteUrl}/${RESOURCE_MANAGER.getResource("DefaultView_Uncertainties_Url").replace("AllItems", "DispForm")}?ID=${this.id}`;
        }
    }
}
