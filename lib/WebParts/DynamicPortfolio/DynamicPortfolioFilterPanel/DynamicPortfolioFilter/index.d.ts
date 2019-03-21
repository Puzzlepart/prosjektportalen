import * as React from "react";
import IDynamicPortfolioFilter from "./IDynamicPortfolioFilter";
import IDynamicPortfolioFilterProps from "./IDynamicPortfolioFilterProps";
import IDynamicPortfolioFilterState from "./IDynamicPortfolioFilterState";
/**
 * DynamicPortfolioFilter
 */
export default class DynamicPortfolioFilter extends React.PureComponent<IDynamicPortfolioFilterProps, IDynamicPortfolioFilterState> {
    static displayName: string;
    /**
     * Constructor
     *
     * @param {IDynamicPortfolioFilterProps} props Pros
     */
    constructor(props: IDynamicPortfolioFilterProps);
    /**
     * Renders the <DynamicPortfolioFilter /> component
    */
    render(): React.ReactElement<IDynamicPortfolioFilterProps>;
    /**
     * Render filter items
     */
    private renderItems;
    /**
     * On expand/collapse
     */
    private onExpandCollapse;
    /**
     * On filter change
     *
     * @param {IDynamicPortfolioFilterItem} item The filter item
     * @param {boolean} checked Is the item checked
     */
    private onChange;
}
export { IDynamicPortfolioFilter };
