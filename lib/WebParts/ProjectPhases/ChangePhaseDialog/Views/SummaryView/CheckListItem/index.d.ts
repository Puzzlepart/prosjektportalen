import * as React from "react";
import IChecklistItemProps from "./IChecklistItemProps";
import IChecklistItemState from "./IChecklistItemState";
/**
 * CheckListItem
 */
export default class CheckListItem extends React.PureComponent<IChecklistItemProps, IChecklistItemState> {
    /**
     * Constructor
     *
     * @param {IChecklistItemProps} props Props
     */
    constructor(props: IChecklistItemProps);
    render(): JSX.Element;
}
