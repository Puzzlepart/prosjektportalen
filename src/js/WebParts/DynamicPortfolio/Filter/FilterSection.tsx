import * as React from "react";
import { Filter, IFilter } from "./Filter";

export const FilterSection = ({ filters, onFilterChange }: { filters: IFilter[], onFilterChange: Function }) => {
    return (<div className="ms-Grid">
        <div className="ms-Grid-row">
            {filters.map((f, idx) => (<Filter key={idx} filter={f} onFilterChange={onFilterChange} />))}
        </div>
    </div>);
};
