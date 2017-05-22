interface IRiskOverviewState {
    items: any[];
    itemsAsHtml?: any[];
    columns: any[];
    showPostAction: boolean;
}

export const RiskOverviewInitialState = {
    items: null,
    columns: null,
    showPostAction: false,
};

export default IRiskOverviewState;
