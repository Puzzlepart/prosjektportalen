import __ from "../../Resources";
import { IBaseWebPartProps } from "../@BaseWebPart";
import { IListProps } from "../@Components/List";

export default interface IExperienceLogProps extends IBaseWebPartProps, IListProps {
    dataSource?: string;
}

export const ExperienceLogDefaultProps: Partial<IExperienceLogProps> = {
    dataSource: "LESSONSLOG",
    columns: [{
        key: "Title",
        fieldName: "Title",
        name: __.getResource("SiteFields_Title_DisplayName"),
        minWidth: 220,
    },
    {
        key: "SiteTitle",
        fieldName: "SiteTitle",
        name: __.getResource("String_Project"),
        minWidth: 100,
        isResizable: true,
    },
    {
        key: "GtProjectLogDescriptionOWSMTXT",
        fieldName: "Description",
        name: __.getResource("SiteFields_GtProjectLogDescription_DisplayName"),
        minWidth: 100,
        isResizable: true,
    },
    {
        key: "GtProjectLogResponsibleOWSCHCS",
        fieldName: "Responsible",
        name: __.getResource("SiteFields_GtProjectLogResponsible_DisplayName"),
        minWidth: 100,
        isResizable: true,
    },
    {
        key: "GtProjectLogConsequenceOWSMTXT",
        fieldName: "Consequence",
        name: __.getResource("SiteFields_GtProjectLogConsequence_DisplayName"),
        minWidth: 100,
        isResizable: true,
    },
    {
        key: "GtProjectLogRecommendationOWSMTXT",
        fieldName: "Recommendation",
        name: __.getResource("SiteFields_GtProjectLogRecommendation_DisplayName"),
        minWidth: 100,
        isResizable: true,
    },
    {
        key: "GtProjectLogActorsOWSCHCM",
        fieldName: "Actors",
        name: __.getResource("SiteFields_GtProjectLogActors_DisplayName"),
        minWidth: 100,
        isResizable: true,
    }],
    groupByOptions: [{ name: __.getResource("String_Project"), key: "SiteTitle" }],
    excelExportEnabled: true,
    excelExportConfig: {
        fileNamePrefix: __.getResource("ExperienceLog_ExcelExportFileNamePrefix"),
        sheetName: "Sheet A",
        buttonLabel: __.getResource("DynamicPortfolio_ExcelExportButtonLabel"),
        buttonIcon: "ExcelDocument",
    },
};
