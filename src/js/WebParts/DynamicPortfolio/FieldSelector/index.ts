import RESOURCE_MANAGER from "localization";
import IFilter from "../FilterPanel/Filter/IFilter";

const FieldSelector: IFilter = {
    name: RESOURCE_MANAGER.getResource("DynamicPortfolio_FieldSelector_Name"),
    key: "Fields",
    emptyMessage: RESOURCE_MANAGER.getResource("DynamicPortfolio_FieldSelector_EmptyMessage"),
    multi: true,
    defaultHidden: false,
    iconName: "ShowResults",
    items: [],
};

export default FieldSelector;

