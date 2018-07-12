import RESOURCE_MANAGER from "../../Resources";
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
        name: RESOURCE_MANAGER.getResource("SiteFields_Title_DisplayName"),
        minWidth: 220,
    },
    {
        key: "SiteTitle",
        fieldName: "SiteTitle",
        name: RESOURCE_MANAGER.getResource("String_Project"),
        minWidth: 100,
        isResizable: true,
    },
    {
        key: "GtProjectLogDescriptionOWSMTXT",
        fieldName: "Description",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProjectLogDescription_DisplayName"),
        minWidth: 100,
        isResizable: true,
    },
    {
        key: "GtProjectLogResponsibleOWSCHCS",
        fieldName: "Responsible",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProjectLogResponsible_DisplayName"),
        minWidth: 100,
        isResizable: true,
    },
    {
        key: "GtProjectLogConsequenceOWSMTXT",
        fieldName: "Consequence",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProjectLogConsequence_DisplayName"),
        minWidth: 100,
        isResizable: true,
    },
    {
        key: "GtProjectLogRecommendationOWSMTXT",
        fieldName: "Recommendation",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProjectLogRecommendation_DisplayName"),
        minWidth: 100,
        isResizable: true,
    },
    {
        key: "GtProjectLogActorsOWSCHCM",
        fieldName: "Actors",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProjectLogActors_DisplayName"),
        minWidth: 100,
        isResizable: true,
    }],
    excelExportEnabled: true,
    excelExportConfig: {
        fileNamePrefix: RESOURCE_MANAGER.getResource("ExperienceLog_ExcelExportFileNamePrefix"),
        sheetName: "Sheet A",
        buttonLabel: RESOURCE_MANAGER.getResource("DynamicPortfolio_ExcelExportButtonLabel"),
        buttonIcon: "ExcelDocument",
    },
};
