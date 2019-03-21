export default class RiskElementModel {
    id: string;
    title: string;
    probability: number;
    consequence: number;
    probabilityPostAction: number;
    consequencePostAction: number;
    action: string;
    url: string;
    webId: string;
    webUrl: string;
    siteTitle: string;
    constructor(id: string, title: string, probability: string, consequence: string, probabilityPostAction: string, consequencePostAction: string);
    getKey(postfix?: string): string;
}
