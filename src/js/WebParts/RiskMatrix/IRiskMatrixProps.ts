import __ from "../../Resources";
import IRiskMatrixData from "./IRiskMatrixData";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

export default interface IRiskMatrixProps extends React.HTMLAttributes<HTMLElement> {
    data?: IRiskMatrixData;
    columns?: Array<IColumn>;
    contentTypeId?: string;
    loadingText?: string;
    showEmptyMessage?: boolean;
    showViewSelector?: boolean;
    showProjectSelector?: boolean;
    showProjectColumn?: boolean;
    hideLabelsBreakpoint?: number;
    dataSourceName?: string;
    queryTemplate?: string;
    viewName?: string;
    rowLimit?: number;
    postActionShowOriginal?: boolean;
}

export const RiskMatrixDefaultProps: Partial<IRiskMatrixProps> = {
    dataSourceName: "RISKOVERVIEW",
    columns: [
        {
            key: "ID",
            fieldName: "id",
            name: "ID",
            minWidth: 100,
            maxWidth: 100,
        },
        {
            key: "Title",
            fieldName: "title",
            name: __.getResource("SiteFields_Title_DisplayName"),
            minWidth: 220,
            isMultiline: true,
        },
        {
            key: "SiteTitle",
            fieldName: "siteTitle",
            name: __.getResource("String_Project"),
            minWidth: 200,
        },
        {
            key: "Probability",
            fieldName: "probability",
            name: __.getResource("SiteFields_GtRiskProbability_DisplayName"),
            minWidth: 100,
        },
        {
            key: "Consequence",
            fieldName: "consequence",
            name: __.getResource("SiteFields_GtRiskConsequence_DisplayName"),
            minWidth: 100,
        },
        {
            key: "ProbabilityPostAction",
            fieldName: "probabilityPostAction",
            name: __.getResource("SiteFields_GtRiskProbabilityPostAction_DisplayName"),
            minWidth: 100,
        },
        {
            key: "ConsequencePostAction",
            fieldName: "consequencePostAction",
            name: __.getResource("SiteFields_GtRiskConsequencePostAction_DisplayName"),
            minWidth: 100,
        },
        {
            key: "Action",
            fieldName: "action",
            name: __.getResource("SiteFields_GtRiskAction_DisplayName"),
            minWidth: 300,
            isMultiline: true,
        },
    ],
    contentTypeId: "0x010088578E7470CC4AA68D566346483107020101",
    loadingText: __.getResource("RiskMatrix_LoadingText"),
    className: "risk-matrix-container",
    id: "risk-matrix",
    showEmptyMessage: false,
    showViewSelector: true,
    showProjectSelector: true,
    showProjectColumn: true,
    hideLabelsBreakpoint: 900,
    rowLimit: 500,
    postActionShowOriginal: true,
};
