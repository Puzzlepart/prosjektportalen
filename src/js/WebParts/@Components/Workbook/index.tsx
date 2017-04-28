import * as React from "react";
import { Button, IColumn } from "office-ui-fabric-react";
import Workbook from "react-excel-workbook";

export interface IDownloadWorkbookButtonProps {
    fileName: string;
    buttonLabel: string;
    buttonIconName: string;
    sheetName: string;
    columns: IColumn[];
    data: any[];
}

/**
 * Button to download the items as an Excel workbook
 */
export const DownloadWorkbookButton = ({ fileName, sheetName, buttonLabel, buttonIconName, columns, data }: IDownloadWorkbookButtonProps) => {
    if (columns && data) {
        return (<Workbook filename={fileName} element={<Button text={buttonLabel} icon={buttonIconName} />}>
            {[<Workbook.Sheet key={0} data={data} name={sheetName}>
                {columns.map(col => <Workbook.Column key={col.key} label={col.name} value={col.key} />)}
            </Workbook.Sheet>]}
        </Workbook>);
    }
    return null;
};
