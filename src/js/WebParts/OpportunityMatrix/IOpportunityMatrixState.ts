import IMatrixCell from "../../Model/IMatrixCell";
import IOpportunityMatrixData from "./IOpportunityMatrixData";

export default interface IOpportunityMatrixState {
    data?: IOpportunityMatrixData;
    selectedOpportunity?: any;
    showDialog?: boolean;
    postAction?: boolean;
    hideLabels?: boolean;
    selectedViewId?: string;
    matrixCells?: Array<IMatrixCell[]>;
}
