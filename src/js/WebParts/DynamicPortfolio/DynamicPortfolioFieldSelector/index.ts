import RESOURCE_MANAGER from "../../../Resources";
import { IDynamicPortfolioFilter } from "../DynamicPortfolioFilterPanel";

const DynamicPortfolioFieldSelector: IDynamicPortfolioFilter = {
    fieldName: "Fields",
    name: RESOURCE_MANAGER.getResource("DynamicPortfolio_FieldSelector_Name"),
    key: "Fields",
    emptyMessage: RESOURCE_MANAGER.getResource("DynamicPortfolio_FieldSelector_EmptyMessage"),
    multi: true,
    defaultHidden: false,
    iconName: "ShowResults",
    items: [],
};

export default DynamicPortfolioFieldSelector;

