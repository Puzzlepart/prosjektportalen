import IFilter from "../FilterPanel/Filter/IFilter";

const FieldSelector: IFilter = {
    name: __("DynamicPortfolio_FieldSelector_Name"),
    key: "Fields",
    emptyMessage: __("DynamicPortfolio_FieldSelector_EmptyMessage"),
    multi: true,
    defaultHidden: false,
    iconName: "ShowResults",
    items: [],
};

export default FieldSelector;

