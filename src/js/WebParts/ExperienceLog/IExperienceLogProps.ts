import RESOURCE_MANAGER from "../../Resources";
import {
    SelectionMode,
    ConstrainMode,
    DetailsListLayoutMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { IBaseWebPartProps } from "../@BaseWebPart";
import ISearchResultSource from "../ISearchResultSource";
import IGroupByOption from "../IGroupByOption";

export interface IExperienceLogExcelExportConfig {
    fileName: string;
    sheetName: string;
    buttonLabel: string;
    buttonIcon: string;
}
export default interface IExperienceLogProps extends IBaseWebPartProps {
    constrainMode?: ConstrainMode;
    layoutMode?: DetailsListLayoutMode;
    selectionMode?: SelectionMode;
    groupByOptions?: IGroupByOption[];
    showSearchBox?: boolean;
    showCommandBar?: boolean;
    searchProperty?: string;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    columns?: any[];
    resultSource?: ISearchResultSource;
    excelExportEnabled?: boolean;
    excelExportConfig?: IExperienceLogExcelExportConfig;
}

export const ExperienceLogDefaultProps: Partial<IExperienceLogProps> = {
    showSearchBox: false,
    groupByOptions: [],
    constrainMode: ConstrainMode.horizontalConstrained,
    projectInfoFilterField: "GtPcPortfolioPage",
    layoutMode: DetailsListLayoutMode.fixedColumns,
    selectionMode: SelectionMode.none,
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
    },
    {
        key: "GtProjectLogDescriptionOWSMTXT",
        fieldName: "Description",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProjectLogDescription_DisplayName"),
    },
    {
        key: "GtProjectLogResponsibleOWSCHCS",
        fieldName: "Responsible",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProjectLogResponsible_DisplayName"),
    },
    {
        key: "GtProjectLogConsequenceOWSMTXT",
        fieldName: "Consequence",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProjectLogConsequence_DisplayName"),
    },
    {
        key: "GtProjectLogRecommendationOWSMTXT",
        fieldName: "Recommendation",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProjectLogRecommendation_DisplayName"),
    },
    {
        key: "GtProjectLogActorsOWSCHCM",
        fieldName: "Actors",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProjectLogActors_DisplayName"),
    }].map(col => ({
        ...col,
        isResizable: true,
    })),
    resultSource: { Name: RESOURCE_MANAGER.getResource("DataSourceName_ExperienceLog"), Level: RESOURCE_MANAGER.getResource("ResultSourceLevel_ExperienceLog") },
    excelExportEnabled: true,
    excelExportConfig: {
        fileName: RESOURCE_MANAGER.getResource("DynamicPortfolio_ExcelExportFileName"),
        sheetName: "Sheet A",
        buttonLabel: RESOURCE_MANAGER.getResource("DynamicPortfolio_ExcelExportButtonLabel"),
        buttonIcon: "ExcelDocument",
    },
};
