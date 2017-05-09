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
}

/**
 * Filter Panel
 */
const FilterPanel = ({ filters, onFilterChange, onDismiss, isOpen }: IFilterPanelProps) => {
    return (
        <Panel
            isOpen={isOpen}
            onDismiss={onDismiss}
            type={PanelType.smallFixedFar}>
            <div className="ms-Grid" style={{ marginTop: 20 }}>
                <div className="ms-Grid-row">
                    {filters
                        .filter(filter => filter.items.length > 1)
                        .map((filter, idx) => (<Filter
                            key={idx}
                            filter={filter}
                            onFilterChange={onFilterChange} />))}
                </div>
            </div>
        </Panel>);
};

export default FilterPanel;
