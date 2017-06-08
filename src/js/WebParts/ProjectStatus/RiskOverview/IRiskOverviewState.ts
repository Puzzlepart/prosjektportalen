export class RiskElementModel {
    public ID: string;
    public Title: string;
    public GtRiskProbability: string;
    public GtRiskConsequence: string;
    public GtRiskProbabilityPostAction: string;
    public GtRiskConsequencePostAction: string;
}

interface IRiskOverviewState {
    isLoading: boolean;
    items?: RiskElementModel[];
    columns?: any[];
    showPostAction?: boolean;
}

export const RiskOverviewInitialState = {
    isLoading: true,
    items: null,
    columns: null,
    showPostAction: false,
};

export default IRiskOverviewState;
