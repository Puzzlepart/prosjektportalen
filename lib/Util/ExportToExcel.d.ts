export interface IExcelExportSheet {
    name?: string;
    data: Array<any[]>;
}
export interface IExcelExportSettings {
    sheets: IExcelExportSheet[];
    fileName: string;
    options?: any;
}
export declare enum ExcelExportStatus {
    Idle = 0,
    Exporting = 1
}
export default function ExportToExcel({ sheets, fileName, options }: IExcelExportSettings): Promise<void>;
