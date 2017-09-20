import * as React from "react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import IFilterItemProps from "./IFilterItemProps";

/**
 * Filter Item
 *
 * @param {IFilterItemProps} param0 Props
 */
const FilterItem = ({ filter, item, className, marginBottom, padding, onChange }: IFilterItemProps) => {
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

export default FilterItem;
