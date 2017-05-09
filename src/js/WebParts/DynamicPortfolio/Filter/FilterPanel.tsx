import * as React from "react";
import {
    Panel,
    PanelType,
} from "office-ui-fabric-react";
import {
    Filter,
    IFilter,
} from "./Filter";

export interface IFilterPanelProps {
    filters: IFilter[];
    onFilterChange: Function;
    onDismiss: () => void;
    isOpen: boolean;
}

/**
 * Filter Panel
 */
export const FilterPanel = ({ filters, onFilterChange, onDismiss, isOpen }: IFilterPanelProps) => {
    return (
        <Panel
            isOpen={isOpen}
            onDismiss={onDismiss}
            type={PanelType.smallFixedFar}
            headerText="Filtrer resultatet">
            <div className="ms-Grid" style={{ marginTop: 20 }}>
                <div className="ms-Grid-row">
                    {filters.map((f, idx) => (<Filter
                        key={idx}
                        filter={f}
                        onFilterChange={onFilterChange} />))}
                </div>
            </div>
        </Panel>);
};
