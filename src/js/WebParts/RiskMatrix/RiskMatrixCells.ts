import RESOURCE_MANAGER from "../../Resources";

export enum RiskMatrixCellType {
    Header,
    Cell,
}

export interface IRiskMatrixCell {
    cellValue?: string;
    cellType: RiskMatrixCellType;
    className: string;
    style?: React.CSSProperties;
    consequence?: number;
    probability?: number;
}

const RiskMatrixCells: Array<IRiskMatrixCell[]> = [
    [
        {

            cellType: RiskMatrixCellType.Header,
            className: "risk-header",
        },
        {
            cellValue: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Insignificant"),
            cellType: RiskMatrixCellType.Header,
            className: "risk-header",
        },
        {
            cellValue: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Small"),
            cellType: RiskMatrixCellType.Header,
            className: "risk-header",
        },
        {
            cellValue: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Moderate"),
            cellType: RiskMatrixCellType.Header,
            className: "risk-header",
        },
        {
            cellValue: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Serious"),
            cellType: RiskMatrixCellType.Header,
            className: "risk-header",
        },
        {
            cellValue: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Critical"),
            cellType: RiskMatrixCellType.Header,
            className: "risk-header",
        },
    ],
    [
        {
            cellValue: RESOURCE_MANAGER.getResource("RiskMatrix_Header_VeryHigh"),
            cellType: RiskMatrixCellType.Header,
            className: "risk-header",
        },
        {
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 1,
            probability: 5,
        },
        {
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 2,
            probability: 5,
        },
        {
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#ea5c73" },
            consequence: 3,
            probability: 5,
        },
        {
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#ea5c73" },
            consequence: 4,
            probability: 5,
        },
        {
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#ea5c73" },
            consequence: 5,
            probability: 5,
        },
    ],
    [
        {
            cellValue: RESOURCE_MANAGER.getResource("RiskMatrix_Header_High"),
            cellType: RiskMatrixCellType.Header,
            className: "risk-header",
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 1,
            probability: 4,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 2,
            probability: 4,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 3,
            probability: 4,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#ea5c73" },
            consequence: 4,
            probability: 4,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#ea5c73" },
            consequence: 5,
            probability: 4,
        },
    ],
    [
        {
            cellValue: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Medium"),
            cellType: RiskMatrixCellType.Header,
            className: "risk-header",
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 1,
            probability: 3,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 2,
            probability: 3,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 3,
            probability: 3,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 4,
            probability: 3,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#ea5c73" },
            consequence: 5,
            probability: 3,
        },
    ],
    [
        {
            cellValue: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Low"),
            cellType: RiskMatrixCellType.Header,
            className: "risk-header",
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 1,
            probability: 2,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 2,
            probability: 2,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 3,
            probability: 2,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 4,
            probability: 2,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 5,
            probability: 2,
        },
    ],
    [
        {
            cellValue: RESOURCE_MANAGER.getResource("RiskMatrix_Header_VeryLow"),
            cellType: RiskMatrixCellType.Header,
            className: "risk-header",
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 1,
            probability: 1,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 2,
            probability: 1,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 3,
            probability: 1,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 4,
            probability: 1,
        },
        {

            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 5,
            probability: 1,
        },
    ],
];

export default RiskMatrixCells;
