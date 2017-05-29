import * as React from "react";
import {
    Panel,
    PanelType,
} from "office-ui-fabric-react/lib/Panel";
import Filter from "./Filter";
import IFilterPanelProps from "./IFilterPanelProps";

/**
 * Filter Panel
 */
const FilterPanel = ({ filters, onFilterChange, onDismiss, isOpen, showIcons }: IFilterPanelProps) => {
    return (
        <Panel
            isOpen={isOpen}
            isBlocking={true}
            onDismiss={onDismiss}
            headerText={__("String_Filters")}
            type={PanelType.smallFixedFar}>
            <div
                className="ms-Grid"
                style={{
                    marginTop: 20,
                }}>
                {filters
                    .filter(filter => filter.items.length > 1)
                    .map((filter, idx) => (
                        <Filter
                            key={idx}
                            filter={filter}
                            showIcon={showIcons}
                            onFilterChange={onFilterChange} />
                    ))}
            </div>
        </Panel>);
};

export default FilterPanel;

