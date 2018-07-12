import __ from "../../Resources";
import { IBaseWebPartProps } from "../@BaseWebPart";
import { IListProps } from "../@Components/List";

export default interface IProjectResourcesProps extends IBaseWebPartProps, IListProps { }

export const ProjectResourcesDefaultProps: Partial<IProjectResourcesProps> = {
    columns: [{
        key: "SiteTitle",
        fieldName: "SiteTitle",
        name: __.getResource("String_Project"),
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
    },
    {
        key: "RefinableString71",
        fieldName: "ResourceUser",
        name: __.getResource("SiteFields_GtResourceUser_DisplayName"),
        minWidth: 200,
        maxWidth: 300,
        isResizable: true,
    },
    {
        key: "RefinableString72",
        fieldName: "ResourceRole",
        name: __.getResource("SiteFields_GtResourceRole_DisplayName"),
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    },
    {
        key: "GtStartDateOWSDATE",
        fieldName: "StartDate",
        name: __.getResource("SiteFields_GtStartDate_DisplayName"),
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    },
    {
        key: "GtEndDateOWSDATE",
        fieldName: "EndDate",
        name: __.getResource("SiteFields_GtEndDate_DisplayName"),
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    },
    {
        key: "RefinableString52",
        fieldName: "ProjectPhase",
        name: __.getResource("SiteFields_GtProjectPhase_DisplayName"),
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    }],
    groupByOptions: [
        { name: __.getResource("String_Project"), key: "SiteTitle" },
        { name: __.getResource("SiteFields_GtProjectPhase_DisplayName"), key: "ProjectPhase" },
        { name: __.getResource("SiteFields_GtResourceUser_DisplayName"), key: "ResourceUser" },
        { name: __.getResource("SiteFields_GtResourceRole_DisplayName"), key: "ResourceRole" },
    ],
};
