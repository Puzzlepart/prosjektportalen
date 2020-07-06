import SectionModel from './SectionModel'
import IRiskMatrixProps from '../../RiskMatrix/IRiskMatrixProps'

export default interface ISectionProps {
    index: number;
    section: SectionModel;
    project: any;
    fields: any[];
    riskMatrix?: IRiskMatrixProps;
}
