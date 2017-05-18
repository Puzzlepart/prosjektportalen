import * as React from "react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { IFilter } from "../Filter";

export interface IFilterItem {
    name: string;
    value: string;
    defaultSelected?: boolean;
    readOnly?: boolean;
    selected?: boolean;
}

export interface IFilterItemProps {
    filter: IFilter;
    item: IFilterItem;
    className: string;
    onChange: (item: any, checked: boolean) => void;
}

/**
 * Filter Item
 */
export const FilterItem = ({ filter, item, className, onChange }: IFilterItemProps) => {
    return (<li>
        <div className={className}>
            <Checkbox
                label={item.name}
                disabled={item.readOnly}
                defaultChecked={item.selected}
                onChange={(e, checked) => onChange(item, checked)} />
        </div>
    </li>);
};
