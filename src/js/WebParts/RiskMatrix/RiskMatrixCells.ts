import RESOURCE_MANAGER from "../../Resources";

export enum RiskMatrixCellType {
    Header,
    Cell,
}

export interface IRiskMatrixCell  {
    cellValue: string;
    cellType: RiskMatrixCellType;
    className: string;
    consequence?: number;
    probability?: number;
}

const RiskMatrixCells: Array<IRiskMatrixCell[]> = [
    [
        {
            cellValue: "",
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
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell positive-cell",
            consequence: 1,
            probability: 5,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell neutral-cell",
            consequence: 2,
            probability: 5,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell negative-cell",
            consequence: 3,
            probability: 5,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell negative-cell",
            consequence: 4,
            probability: 5,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell negative-cell",
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
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell positive-cell",
            consequence: 1,
            probability: 4,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell neutral-cell",
            consequence: 2,
            probability: 4,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell neutral-cell",
            consequence: 3,
            probability: 4,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell negative-cell",
            consequence: 4,
            probability: 4,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell negative-cell",
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
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell positive-cell",
            consequence: 1,
            probability: 3,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell positive-cell",
            consequence: 2,
            probability: 3,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell neutral-cell",
            consequence: 3,
            probability: 3,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell neutral-cell",
            consequence: 4,
            probability: 3,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell negative-cell",
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
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell positive-cell",
            consequence: 1,
            probability: 2,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell positive-cell",
            consequence: 2,
            probability: 2,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell positive-cell",
            consequence: 3,
            probability: 2,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell neutral-cell",
            consequence: 4,
            probability: 2,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell neutral-cell",
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
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell positive-cell",
            consequence: 1,
            probability: 1,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell positive-cell",
            consequence: 2,
            probability: 1,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell positive-cell",
            consequence: 3,
            probability: 1,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell positive-cell",
            consequence: 4,
            probability: 1,
        },
        {
            cellValue: "",
            cellType: RiskMatrixCellType.Cell,
            className: "risk-matrix-cell neutral-cell",
            consequence: 5,
            probability: 1,
        },
    ],
];

export default RiskMatrixCells;
