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
        name: "Navn",
        minWidth: 200,
        maxWidth: 300,
        isResizable: true,
    },
    {
        key: "RefinableString72",
        fieldName: "ResourceRole",
        name: "Rolle",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    },
    {
        key: "GtStartDateOWSDATE",
        fieldName: "StartDate",
        name: "Startdato",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    },
    {
        key: "GtEndDateOWSDATE",
        fieldName: "EndDate",
        name: "Sluttdato",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    },
    {
        key: "RefinableString52",
        fieldName: "ProjectPhase",
        name: "Fase",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    }],
};
