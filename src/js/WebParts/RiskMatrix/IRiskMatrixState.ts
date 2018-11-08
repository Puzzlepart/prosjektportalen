import IMatrixCell from "../../Model/IMatrixCell";
import IRiskMatrixData from "./IRiskMatrixData";

export default interface IRiskMatrixState {
    isLoading?: boolean;
    data?: IRiskMatrixData;
    selectedRisk?: any;
    showDialog?: boolean;
    postAction?: boolean;
    hideLabels?: boolean;
    selectedViewId?: string;
    selectedProject?: string;
    matrixCells?: Array<IMatrixCell[]>;
}
