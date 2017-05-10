import * as React from "react";
import {
    Panel,
    PanelType,
} from "office-ui-fabric-react";
import {
    Filter,
    IFilter,
} from "../Filter";

export interface IFilterPanelProps {
    filters: IFilter[];
    onFilterChange: (filter: IFilter) => void;
    onDismiss: () => void;
    isOpen: boolean;
    showIcons?: boolean;
}

/**
 * Filter Panel
 */
const FilterPanel = ({ filters, onFilterChange, onDismiss, isOpen, showIcons }: IFilterPanelProps) => {
    return (
        <Panel
            isOpen={isOpen}
            isBlocking={false}
            onDismiss={onDismiss}
            headerText={__("String_Filters")}
            type={PanelType.smallFixedFar}>
            <div className="ms-Grid" style={{ marginTop: 20 }}>
                <div className="ms-Grid-row">
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
            </div>
        </Panel>);
};

export default FilterPanel;
