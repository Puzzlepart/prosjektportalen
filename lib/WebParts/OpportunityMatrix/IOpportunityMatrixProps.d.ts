/// <reference types="react" />
import IOpportunityMatrixData from "./IOpportunityMatrixData";
export default interface IOpportunityMatrixProps extends React.HTMLAttributes<HTMLElement> {
    data?: IOpportunityMatrixData;
    contentTypeId?: string;
    showEmptyMessage?: boolean;
    showViewSelector?: boolean;
    hideLabelsBreakpoint?: number;
}
export declare const OpportunityMatrixDefaultProps: Partial<IOpportunityMatrixProps>;
