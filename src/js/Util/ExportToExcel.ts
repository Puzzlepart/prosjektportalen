import { loadLibraries } from './'

function s2ab(s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
}

export interface IExcelExportSheet {
    name?: string;
    data: Array<any[]>;
}

export interface IExcelExportSettings {
    sheets: IExcelExportSheet[];
    fileName: string;
    options?: any;
}

export enum ExcelExportStatus {
    Idle,
    Exporting,
}

export default async function ExportToExcel({ sheets, fileName, options = { type: 'binary', bookType: 'xlsx' } }: IExcelExportSettings): Promise<void> {
    await loadLibraries(['FileSaver.min.js', 'xlsx.full.min.js'])
    const workBook = (window as any).XLSX.utils.book_new()
    sheets.forEach((s, index) => {
        const sheet = (window as any).XLSX.utils.aoa_to_sheet(s.data);
        (window as any).XLSX.utils.book_append_sheet(workBook, sheet, s.name || `Sheet${index + 1}`)
    })
    const wbout = (window as any).XLSX.write(workBook, options);
    (window as any).saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), fileName)
    return
}



