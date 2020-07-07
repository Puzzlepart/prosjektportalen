import IMatrixCell from '../../Model/IMatrixCell'
import IRiskMatrixData from './IRiskMatrixData'
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown'

export default interface IRiskMatrixState {
    isLoading?: boolean;
    data?: IRiskMatrixData;
    showDialog?: boolean;
    postAction?: boolean;
    hideLabels?: boolean;
    selectedRisk?: any;
    selectedViewId?: string;
    selectedProject?: IDropdownOption;
    matrixCells?: Array<IMatrixCell[]>;
}
