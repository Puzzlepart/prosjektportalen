import ISectionListData from "../ISectionListData";

export default interface IRiskMatrixProps {
    listData: ISectionListData;
    contentTypeId?: string;
    containerClassName?: string;
    tableId?: string;
}

export const RiskMatrixDefaultProps: Partial<IRiskMatrixProps> = {
    contentTypeId: "0x010088578E7470CC4AA68D566346483107020101",
    containerClassName: "risk-matrix-container",
    tableId: "risk-matrix",
};
