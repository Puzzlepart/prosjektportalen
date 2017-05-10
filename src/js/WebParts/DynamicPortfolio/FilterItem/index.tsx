import * as React from "react";
import { Util } from "sp-pnp-js";
import { Checkbox } from "office-ui-fabric-react";
import { IFilter } from "../Filter";

export interface IFilterItem {
    name: string;
    value: string;
    defaultSelected?: boolean;
    readOnly?: boolean;
}

export interface IFilterItemProps {
    filter: IFilter;
    item: IFilterItem;
    className: string;
    ref: any;
    onChange: (item: any) => void;
}

/**
 * Filter Item
 */
export const FilterItem = ({ filter, item, className, ref, onChange }: IFilterItemProps) => {
    const defaultChecked = item.defaultSelected || (Util.isArray(filter.selected) && (Array.contains(filter.selected, item.name) || Array.contains(filter.selected, item.value)));
    return (<li>
        <div className={className}>
            <Checkbox
                label={item.name}
                disabled={item.readOnly}
                defaultChecked={defaultChecked}
                onChange={e => onChange(item)}
                ref={ref} />
        </div>
    </li>);
};
