import Localization from "localization";
import IFilter from "../FilterPanel/Filter/IFilter";

const FieldSelector: IFilter = {
    name: Localization.getResource("DynamicPortfolio_FieldSelector_Name"),
    key: "Fields",
    emptyMessage: Localization.getResource("DynamicPortfolio_FieldSelector_EmptyMessage"),
    multi: true,
    defaultHidden: false,
    iconName: "ShowResults",
    items: [],
};

export default FieldSelector;

