import { IBaseWebPartProps } from "../@BaseWebPart";
import { SearchQuery } from "@pnp/sp";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
export default interface ITasksOverviewProps extends IBaseWebPartProps {
    searchConfiguration?: SearchQuery;
    dataSourceName?: string;
    filterColumns?: IColumn[];
    defaultTimeStart?: any[];
    defaultTimeEnd?: any[];
}

export const TasksOverviewDefaultProps: Partial<ITasksOverviewProps> = {
    searchConfiguration: {
        Querytext: "*",
        RowLimit: 500,
        TrimDuplicates: false,
        SelectProperties: [
            "Title",
            "Path",
            "SPWebUrl",
            "WebId",
            "SiteTitle",
            "StatusOWSCHCS",
            "PriorityOWSCHCS",
            "PercentCompleteOWSNMBR",
            "RefinableString52",
            "AssignedTo",
            "Created",
            "DueDateOWSDATE",
            "StartDateOWSDATE",
            "LastModifiedTime",
        ],
    },
    dataSourceName: "TASKS",
    filterColumns: [
        {
            key: "SiteTitle",
            fieldName: "SiteTitle",
            name: "Prosjekt",
            minWidth: 0,
        },
        {
            key: "RefinableString52",
            fieldName: "RefinableString52",
            name: "Fase",
            minWidth: 0,
        },
        {
            key: "StatusOWSCHCS",
            fieldName: "StatusOWSCHCS",
            name: "Status",
            minWidth: 0,
        },
        {
            key: "AssignedTo",
            fieldName: "AssignedTo",
            name: "Tilordnet til",
            minWidth: 0,
        },
    ],
    defaultTimeStart: [-1, "months"],
    defaultTimeEnd: [6, "months"],
};
