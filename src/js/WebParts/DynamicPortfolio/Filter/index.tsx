import { FilterSection } from "./FilterSection";
import { IFilter } from "./Filter";

const FieldFilter: IFilter = {
    name: __("DynamicPortfolio_FieldSelector_Name"),
    key: "Fields",
    emptyMessage: __("DynamicPortfolio_FieldSelector_EmptyMessage"),
    multi: true,
    defaultHidden: true,
    iconName: "ShowResults",
    items: [],
};

export { FilterSection, IFilter, FieldFilter };
