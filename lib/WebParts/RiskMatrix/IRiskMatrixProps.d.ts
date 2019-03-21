/// <reference types="react" />
import IRiskMatrixData from "./IRiskMatrixData";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import DataSource from "../DataSource";
export default interface IRiskMatrixProps extends React.HTMLAttributes<HTMLElement> {
    data?: IRiskMatrixData;
    columns?: Array<IColumn>;
    contentTypeId?: string;
    loadingText?: string;
    showEmptyMessage?: boolean;
    showViewSelector?: boolean;
    hideLabelsBreakpoint?: number;
    dataSource?: DataSource;
    dataSourceName?: string;
    queryTemplate?: string;
    viewName?: string;
    rowLimit?: number;
    postActionShowOriginal?: boolean;
}
export declare const RiskMatrixDefaultProps: Partial<IRiskMatrixProps>;
