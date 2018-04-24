import RESOURCE_MANAGER from "../../Resources";

export enum OpportunityMatrixCellType {
    Header,
    Cell,
}

export interface IOpportunityMatrixCell  {
    cellValue: string;
    cellType: OpportunityMatrixCellType;
    className: string;
    consequence?: number;
    probability?: number;
}

const OpportunityMatrixCells: Array<IOpportunityMatrixCell[]> = [
    [
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Header,
            className: "opportunity-header",
        },
        {
            cellValue: RESOURCE_MANAGER.getResource("OpportunityMatrix_Header_Insignificant"),
            cellType: OpportunityMatrixCellType.Header,
            className: "opportunity-header",
        },
        {
            cellValue: RESOURCE_MANAGER.getResource("OpportunityMatrix_Header_Small"),
            cellType: OpportunityMatrixCellType.Header,
            className: "opportunity-header",
        },
        {
            cellValue: RESOURCE_MANAGER.getResource("OpportunityMatrix_Header_Moderate"),
            cellType: OpportunityMatrixCellType.Header,
            className: "opportunity-header",
        },
        {
            cellValue: RESOURCE_MANAGER.getResource("OpportunityMatrix_Header_Serious"),
            cellType: OpportunityMatrixCellType.Header,
            className: "opportunity-header",
        },
        {
            cellValue: RESOURCE_MANAGER.getResource("OpportunityMatrix_Header_Critical"),
            cellType: OpportunityMatrixCellType.Header,
            className: "opportunity-header",
        },
    ],
    [
        {
            cellValue: RESOURCE_MANAGER.getResource("OpportunityMatrix_Header_VeryHigh"),
            cellType: OpportunityMatrixCellType.Header,
            className: "opportunity-header",
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell positive-cell",
            consequence: 1,
            probability: 5,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell neutral-cell",
            consequence: 2,
            probability: 5,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell negative-cell",
            consequence: 3,
            probability: 5,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell negative-cell",
            consequence: 4,
            probability: 5,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell negative-cell",
            consequence: 5,
            probability: 5,
        },
    ],
    [
        {
            cellValue: RESOURCE_MANAGER.getResource("OpportunityMatrix_Header_High"),
            cellType: OpportunityMatrixCellType.Header,
            className: "opportunity-header",
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell positive-cell",
            consequence: 1,
            probability: 4,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell neutral-cell",
            consequence: 2,
            probability: 4,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell neutral-cell",
            consequence: 3,
            probability: 4,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell negative-cell",
            consequence: 4,
            probability: 4,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell negative-cell",
            consequence: 5,
            probability: 4,
        },
    ],
    [
        {
            cellValue: RESOURCE_MANAGER.getResource("OpportunityMatrix_Header_Medium"),
            cellType: OpportunityMatrixCellType.Header,
            className: "opportunity-header",
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell positive-cell",
            consequence: 1,
            probability: 3,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell positive-cell",
            consequence: 2,
            probability: 3,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell neutral-cell",
            consequence: 3,
            probability: 3,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell neutral-cell",
            consequence: 4,
            probability: 3,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell negative-cell",
            consequence: 5,
            probability: 3,
        },
    ],
    [
        {
            cellValue: RESOURCE_MANAGER.getResource("OpportunityMatrix_Header_Low"),
            cellType: OpportunityMatrixCellType.Header,
            className: "opportunity-header",
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell positive-cell",
            consequence: 1,
            probability: 2,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell positive-cell",
            consequence: 2,
            probability: 2,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell positive-cell",
            consequence: 3,
            probability: 2,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell neutral-cell",
            consequence: 4,
            probability: 2,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell neutral-cell",
            consequence: 5,
            probability: 2,
        },
    ],
    [
        {
            cellValue: RESOURCE_MANAGER.getResource("OpportunityMatrix_Header_VeryLow"),
            cellType: OpportunityMatrixCellType.Header,
            className: "opportunity-header",
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell positive-cell",
            consequence: 1,
            probability: 1,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell positive-cell",
            consequence: 2,
            probability: 1,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell positive-cell",
            consequence: 3,
            probability: 1,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell positive-cell",
            consequence: 4,
            probability: 1,
        },
        {
            cellValue: "",
            cellType: OpportunityMatrixCellType.Cell,
            className: "opportunity-matrix-cell neutral-cell",
            consequence: 5,
            probability: 1,
        },
    ],
];

export default OpportunityMatrixCells;
