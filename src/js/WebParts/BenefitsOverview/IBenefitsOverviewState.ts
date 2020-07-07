import { IBaseWebPartState } from '../@BaseWebPart'
import IGroupByOption from '../IGroupByOption'
import { ExcelExportStatus } from '../../Util/ExportToExcel'
import { IBenefitsOverviewData } from './BenefitsOverviewData'
import { BenefitMeasurementIndicator } from './BenefitsOverviewData/BenefitMeasurementIndicator'
import { BenefitBase } from './BenefitsOverviewData/BenefitBase'

export default interface IBenefitsOverviewState extends IBaseWebPartState {
    data?: IBenefitsOverviewData;
    searchTerm: string;
    groupBy: IGroupByOption;
    selectedProject?: BenefitBase;
    showMeasurements?: BenefitMeasurementIndicator;
    excelExportStatus?: ExcelExportStatus;
}

