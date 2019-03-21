import * as React from "react";
export interface IOpportunityElementProps {
    item: any;
    style?: React.CSSProperties;
}
declare const OpportunityElement: ({ item: { ID, Title }, style }: IOpportunityElementProps) => JSX.Element;
export default OpportunityElement;
