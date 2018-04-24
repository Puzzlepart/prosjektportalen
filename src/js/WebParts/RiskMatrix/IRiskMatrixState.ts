import { IRiskMatrixCell } from "./RiskMatrixCells";
import IRiskMatrixData from "./IRiskMatrixData";

export default interface IRiskMatrixState {
    data?: IRiskMatrixData;
    selectedRisk?: any;
    showDialog?: boolean;
    postAction?: boolean;
    hideLabels?: boolean;
    selectedViewId?: string;
    matrixCells?: Array<IRiskMatrixCell[]>;
}
