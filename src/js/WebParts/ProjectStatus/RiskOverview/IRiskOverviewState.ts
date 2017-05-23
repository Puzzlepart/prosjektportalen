export class RiskElementModel {
    public GtRiskProbability: string;
    public GtRiskConsequence: string;
    public GtRiskProbabilityPostAction: string;
    public GtRiskConsequencePostAction: string;
}

interface IRiskOverviewState {
    items: RiskElementModel[];
    itemsAsHtml?: RiskElementModel[];
    columns: any[];
    showPostAction: boolean;
}

export const RiskOverviewInitialState = {
    items: null,
    columns: null,
    showPostAction: false,
};

export default IRiskOverviewState;
