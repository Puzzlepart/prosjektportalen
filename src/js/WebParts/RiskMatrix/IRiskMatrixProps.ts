import __ from "../../Resources";
import IRiskMatrixData from "./IRiskMatrixData";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

export default interface IRiskMatrixProps extends React.HTMLAttributes<HTMLElement> {
    data?: IRiskMatrixData;
    columns?: Array<IColumn>;
    contentTypeId?: string;
    showEmptyMessage?: boolean;
    showViewSelector?: boolean;
    hideLabelsBreakpoint?: number;
    dataSource?: string;
    viewName?: string;
    rowLimit?: number;
    postActionShowOriginal?: boolean;
}

export const RiskMatrixDefaultProps: Partial<IRiskMatrixProps> = {
    columns: [
        {
            key: "title",
            fieldName: "title",
            name: __.getResource("SiteFields_Title_DisplayName"),
            minWidth: 220,
            isMultiline: true,
        },
        {
            key: "probability",
            fieldName: "probability",
            name: __.getResource("SiteFields_GtRiskProbability_DisplayName"),
            minWidth: 100,
        },
        {
            key: "consequence",
            fieldName: "consequence",
            name: __.getResource("SiteFields_GtRiskConsequence_DisplayName"),
            minWidth: 100,
        },
        {
            key: "probabilityPostAction",
            fieldName: "probabilityPostAction",
            name: __.getResource("SiteFields_GtRiskProbabilityPostAction_DisplayName"),
            minWidth: 100,
        },
        {
            key: "consequencePostAction",
            fieldName: "consequencePostAction",
            name: __.getResource("SiteFields_GtRiskConsequencePostAction_DisplayName"),
            minWidth: 100,
        },
        {
            key: "siteTitle",
            fieldName: "siteTitle",
            name: __.getResource("String_Project"),
            minWidth: 100,
        },
    ],
    contentTypeId: "0x010088578E7470CC4AA68D566346483107020101",
    className: "risk-matrix-container",
    id: "risk-matrix",
    showEmptyMessage: false,
    showViewSelector: true,
    hideLabelsBreakpoint: 900,
    rowLimit: 100,
    postActionShowOriginal: true,
};
