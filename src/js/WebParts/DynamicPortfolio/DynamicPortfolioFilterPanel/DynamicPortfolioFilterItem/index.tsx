import * as React from "react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import IDynamicPortfolioFilterItemProps from "./IDynamicPortfolioFilterItemProps";

/**
 * DynamicPortfolioFilter Item
 *
 * @param {IDynamicPortfolioFilterItemProps} param0 Props
 */
const DynamicPortfolioFilterItem = (props: IDynamicPortfolioFilterItemProps) => {
    return (
        <li>
            <div
                className={props.className}
                style={props.style}>
                <Checkbox
                    label={props.item.name}
                    disabled={props.item.readOnly}
                    defaultChecked={props.item.selected}
                    onChange={(e, checked) => props.onChanged(props.item, checked)} />
            </div>
        </li>
    );
};

export default DynamicPortfolioFilterItem;
