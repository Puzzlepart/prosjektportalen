/// <reference types="react" />
import MatrixCellType from "./MatrixCellType";
export default interface IMatrixCell {
    cellValue?: string;
    cellType: MatrixCellType;
    className: string;
    style?: React.CSSProperties;
    consequence?: number;
    probability?: number;
}
