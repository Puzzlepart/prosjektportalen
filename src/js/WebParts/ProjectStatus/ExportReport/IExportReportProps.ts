import SectionModel from '../Section/SectionModel'

export default interface IExportReportProps {
    project: any;
    sections: SectionModel[];
    exportType: string;
    reportsLibTitle?: string;
    maxReportHistory?: number;
}
