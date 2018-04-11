import * as React from "react";
import RESOURCE_MANAGER from "../../../Resources";
import {
    Panel,
    PanelType,
} from "office-ui-fabric-react/lib/Panel";
import DynamicPortfolioFilter, { IDynamicPortfolioFilter } from "./DynamicPortfolioFilter";
import DynamicPortfolioFilterPanelProps from "./DynamicPortfolioFilterPanelProps";

/**
 * DynamicPortfolioFilter Panel
 *
 * @param {DynamicPortfolioFilterPanelProps} props Props
 */
const DynamicPortfolioFilterPanel = ({ filters, onFilterChange, onDismiss, isOpen, showIcons }: DynamicPortfolioFilterPanelProps) => {
    return (
        <Panel
            isOpen={isOpen}
            isBlocking={true}
            onDismiss={onDismiss}
            headerText={RESOURCE_MANAGER.getResource("String_Filters")}
            type={PanelType.smallFixedFar}>
            <div className="ms-Grid">
                {filters
                    .filter(filter => filter.items.length > 1)
                    .map((filter, idx) => (
                        <DynamicPortfolioFilter
                            key={idx}
                            filter={filter}
                            onFilterChange={onFilterChange} />
                    ))}
            </div>
        </Panel>);
};

export default DynamicPortfolioFilterPanel;
export { IDynamicPortfolioFilter };

