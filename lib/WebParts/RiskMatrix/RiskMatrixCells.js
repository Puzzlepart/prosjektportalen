"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const MatrixCellType_1 = require("../../Model/MatrixCellType");
const RiskMatrixCells = [
    [
        {
            cellType: MatrixCellType_1.default.Header,
            className: "risk-header",
        },
        {
            cellValue: Resources_1.default.getResource("RiskMatrix_Header_Insignificant"),
            cellType: MatrixCellType_1.default.Header,
            className: "risk-header",
        },
        {
            cellValue: Resources_1.default.getResource("RiskMatrix_Header_Small"),
            cellType: MatrixCellType_1.default.Header,
            className: "risk-header",
        },
        {
            cellValue: Resources_1.default.getResource("RiskMatrix_Header_Moderate"),
            cellType: MatrixCellType_1.default.Header,
            className: "risk-header",
        },
        {
            cellValue: Resources_1.default.getResource("RiskMatrix_Header_Serious"),
            cellType: MatrixCellType_1.default.Header,
            className: "risk-header",
        },
        {
            cellValue: Resources_1.default.getResource("RiskMatrix_Header_Critical"),
            cellType: MatrixCellType_1.default.Header,
            className: "risk-header",
        },
    ],
    [
        {
            cellValue: Resources_1.default.getResource("RiskMatrix_Header_VeryHigh"),
            cellType: MatrixCellType_1.default.Header,
            className: "risk-header",
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 1,
            probability: 5,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 2,
            probability: 5,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#ea5c73" },
            consequence: 3,
            probability: 5,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#ea5c73" },
            consequence: 4,
            probability: 5,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#ea5c73" },
            consequence: 5,
            probability: 5,
        },
    ],
    [
        {
            cellValue: Resources_1.default.getResource("RiskMatrix_Header_High"),
            cellType: MatrixCellType_1.default.Header,
            className: "risk-header",
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 1,
            probability: 4,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 2,
            probability: 4,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 3,
            probability: 4,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#ea5c73" },
            consequence: 4,
            probability: 4,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#ea5c73" },
            consequence: 5,
            probability: 4,
        },
    ],
    [
        {
            cellValue: Resources_1.default.getResource("RiskMatrix_Header_Medium"),
            cellType: MatrixCellType_1.default.Header,
            className: "risk-header",
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 1,
            probability: 3,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 2,
            probability: 3,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 3,
            probability: 3,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 4,
            probability: 3,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#ea5c73" },
            consequence: 5,
            probability: 3,
        },
    ],
    [
        {
            cellValue: Resources_1.default.getResource("RiskMatrix_Header_Low"),
            cellType: MatrixCellType_1.default.Header,
            className: "risk-header",
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 1,
            probability: 2,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 2,
            probability: 2,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 3,
            probability: 2,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 4,
            probability: 2,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 5,
            probability: 2,
        },
    ],
    [
        {
            cellValue: Resources_1.default.getResource("RiskMatrix_Header_VeryLow"),
            cellType: MatrixCellType_1.default.Header,
            className: "risk-header",
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 1,
            probability: 1,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 2,
            probability: 1,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 3,
            probability: 1,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#2da748" },
            consequence: 4,
            probability: 1,
        },
        {
            cellType: MatrixCellType_1.default.Cell,
            className: "risk-matrix-cell",
            style: { backgroundColor: "#e9b359" },
            consequence: 5,
            probability: 1,
        },
    ],
];
exports.default = RiskMatrixCells;
