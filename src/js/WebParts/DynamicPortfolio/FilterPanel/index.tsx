import * as React from "react";
import Localization from "localization";
import {
    Panel,
    PanelType,
} from "office-ui-fabric-react/lib/Panel";
import Filter from "./Filter";
import IFilterPanelProps from "./IFilterPanelProps";

/**
 * Filter Panel
 *
 * @param {IFilterPanelProps} props Props
 */
const FilterPanel = ({ filters, onFilterChange, onDismiss, isOpen, showIcons }: IFilterPanelProps) => {
    return (
        <Panel
            isOpen={isOpen}
            isBlocking={true}
            onDismiss={onDismiss}
            headerText={Localization.getResource("String_Filters")}
            type={PanelType.smallFixedFar}>
            <div className="ms-Grid">
                {filters
                    .filter(filter => filter.items.length > 1)
                    .map((filter, idx) => (
                        <Filter
                            key={idx}
                            filter={filter}
                            onFilterChange={onFilterChange} />
                    ))}
            </div>
        </Panel>);
};

export default FilterPanel;

