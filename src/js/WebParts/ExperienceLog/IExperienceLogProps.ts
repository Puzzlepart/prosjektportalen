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
        name: __("SiteFields_Title_DisplayName"),
        minWidth: 220,
    },
    {
        key: "SiteTitle",
        fieldName: "SiteTitle",
        name: __("String_Project"),
    },
    {
        key: "GtProjectLogDescriptionOWSMTXT",
        fieldName: "Description",
        name: __("SiteFields_GtProjectLogDescription_DisplayName"),
    },
    {
        key: "GtProjectLogResponsibleOWSCHCS",
        fieldName: "Responsible",
        name: __("SiteFields_GtProjectLogResponsible_DisplayName"),
    },
    {
        key: "GtProjectLogConsequenceOWSMTXT",
        fieldName: "Consequence",
        name: __("SiteFields_GtProjectLogConsequence_DisplayName"),
    },
    {
        key: "GtProjectLogRecommendationOWSMTXT",
        fieldName: "Recommendation",
        name: __("SiteFields_GtProjectLogRecommendation_DisplayName"),
    },
    {
        key: "GtProjectLogActorsOWSCHCM",
        fieldName: "Actors",
        name: __("SiteFields_GtProjectLogActors_DisplayName"),
    }].map(col => ({
        ...col,
        isResizable: true,
    })),
};
