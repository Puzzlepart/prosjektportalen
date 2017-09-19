import {
    SelectionMode,
    ConstrainMode,
    DetailsListLayoutMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IExperienceLogProps extends IBaseWebPartProps {
    constrainMode?: ConstrainMode;
    layoutMode?: DetailsListLayoutMode;
    selectionMode?: SelectionMode;
    columns?: any[];
}

export const ExperienceLogDefaultProps: Partial<IExperienceLogProps> = {
    constrainMode: ConstrainMode.horizontalConstrained,
    layoutMode: DetailsListLayoutMode.fixedColumns,
    selectionMode: SelectionMode.none,
    columns: [{
        key: "Title",
        fieldName: "Title",
        name: Localization.getResource("SiteFields_Title_DisplayName"),
        minWidth: 220,
    },
    {
        key: "SiteTitle",
        fieldName: "SiteTitle",
        name: Localization.getResource("String_Project"),
    },
    {
        key: "GtProjectLogDescriptionOWSMTXT",
        fieldName: "Description",
        name: Localization.getResource("SiteFields_GtProjectLogDescription_DisplayName"),
    },
    {
        key: "GtProjectLogResponsibleOWSCHCS",
        fieldName: "Responsible",
        name: Localization.getResource("SiteFields_GtProjectLogResponsible_DisplayName"),
    },
    {
        key: "GtProjectLogConsequenceOWSMTXT",
        fieldName: "Consequence",
        name: Localization.getResource("SiteFields_GtProjectLogConsequence_DisplayName"),
    },
    {
        key: "GtProjectLogRecommendationOWSMTXT",
        fieldName: "Recommendation",
        name: Localization.getResource("SiteFields_GtProjectLogRecommendation_DisplayName"),
    },
    {
        key: "GtProjectLogActorsOWSCHCM",
        fieldName: "Actors",
        name: Localization.getResource("SiteFields_GtProjectLogActors_DisplayName"),
    }].map(col => ({
        ...col,
        isResizable: true,
    })),
};
