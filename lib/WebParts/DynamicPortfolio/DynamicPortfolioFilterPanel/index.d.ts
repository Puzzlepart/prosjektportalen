/// <reference types="react" />
import { IDynamicPortfolioFilter } from "./DynamicPortfolioFilter";
import DynamicPortfolioFilterPanelProps from "./DynamicPortfolioFilterPanelProps";
/**
 * DynamicPortfolioFilter Panel
 *
 * @param {DynamicPortfolioFilterPanelProps} props Props
 */
declare const DynamicPortfolioFilterPanel: ({ filters, onFilterChange, onDismiss, isOpen, showIcons }: DynamicPortfolioFilterPanelProps) => JSX.Element;
export default DynamicPortfolioFilterPanel;
export { IDynamicPortfolioFilter };
