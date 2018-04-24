import IOpportunityMatrixData from "./IOpportunityMatrixData";

export default interface IOpportunityMatrixProps extends React.HTMLAttributes<HTMLElement> {
    data?: IOpportunityMatrixData;
    contentTypeId?: string;
    showEmptyMessage?: boolean;
    showViewSelector?: boolean;
}

export const OpportunityMatrixDefaultProps: Partial<IOpportunityMatrixProps> = {
    contentTypeId: "0x010088578E7470CC4AA68D566346483107020102",
    className: "opportunity-matrix-container",
    id: "opportunity-matrix",
    showEmptyMessage: false,
    showViewSelector: true,
};
