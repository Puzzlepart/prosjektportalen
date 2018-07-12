import RESOURCE_MANAGER from "../../Resources";
import { IBaseWebPartProps } from "../@BaseWebPart";
import { IListProps } from "../@Components/List";

export default interface IProjectResourcesProps extends IBaseWebPartProps, IListProps { }

export const ProjectResourcesDefaultProps: Partial<IProjectResourcesProps> = {
    columns: [{
        key: "SiteTitle",
        fieldName: "SiteTitle",
        name: RESOURCE_MANAGER.getResource("String_Project"),
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
    },
    {
        key: "RefinableString71",
        fieldName: "ResourceUser",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtResourceUser_DisplayName"),
        minWidth: 200,
        maxWidth: 300,
        isResizable: true,
    },
    {
        key: "RefinableString72",
        fieldName: "ResourceRole",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtResourceRole_DisplayName"),
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    },
    {
        key: "GtStartDateOWSDATE",
        fieldName: "StartDate",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtStartDate_DisplayName"),
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    },
    {
        key: "GtEndDateOWSDATE",
        fieldName: "EndDate",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtEndDate_DisplayName"),
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    },
    {
        key: "RefinableString52",
        fieldName: "ProjectPhase",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProjectPhase_DisplayName"),
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    }],
    groupByOptions: [
        { name: RESOURCE_MANAGER.getResource("String_Project"), key: "SiteTitle" },
        { name: RESOURCE_MANAGER.getResource("SiteFields_GtProjectPhase_DisplayName"), key: "ProjectPhase" },
        { name: RESOURCE_MANAGER.getResource("SiteFields_GtResourceUser_DisplayName"), key: "ResourceUser" },
        { name: RESOURCE_MANAGER.getResource("SiteFields_GtResourceRole_DisplayName"), key: "ResourceRole" },
    ],
};
