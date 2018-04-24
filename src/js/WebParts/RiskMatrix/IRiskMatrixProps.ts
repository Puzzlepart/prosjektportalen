import IRiskMatrixData from "./IRiskMatrixData";

export default interface IRiskMatrixProps extends React.HTMLAttributes<HTMLElement> {
    data?: IRiskMatrixData;
    contentTypeId?: string;
    showEmptyMessage?: boolean;
    showViewSelector?: boolean;
    hideLabelsBreakpoint?: number;
}

export const RiskMatrixDefaultProps: Partial<IRiskMatrixProps> = {
    contentTypeId: "0x010088578E7470CC4AA68D566346483107020101",
    className: "risk-matrix-container",
    id: "risk-matrix",
    showEmptyMessage: false,
    showViewSelector: true,
    hideLabelsBreakpoint: 900,
};
