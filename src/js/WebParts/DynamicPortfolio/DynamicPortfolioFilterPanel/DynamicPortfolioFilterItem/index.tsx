import * as React from "react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import IDynamicPortfolioFilterItemProps from "./IDynamicPortfolioFilterItemProps";

/**
 * DynamicPortfolioFilter Item
 *
 * @param {IDynamicPortfolioFilterItemProps} param0 Props
 */
const DynamicPortfolioFilterItem = ({ filter, item, className, marginBottom, padding, onChange }: IDynamicPortfolioFilterItemProps) => {
    return (
        <li>
            <div
                className={className}
                style={{
                    padding,
                    marginBottom,
                }}>
                <Checkbox
                    label={item.name}
                    disabled={item.readOnly}
                    defaultChecked={item.selected}
                    onChange={(e, checked) => onChange(item, checked)} />
            </div>
        </li>
    );
};

export default DynamicPortfolioFilterItem;
