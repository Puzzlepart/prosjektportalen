import __ from "../../Resources";
import { IBaseWebPartProps } from "../@BaseWebPart";
import { SearchQuery } from "@pnp/sp";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

export default interface ITasksOverviewProps extends IBaseWebPartProps {
    searchQuery?: SearchQuery;
    dataSourceName?: string;
    filterColumns?: IColumn[];
    defaultTimeStart?: any[];
    defaultTimeEnd?: any[];
    groupByOptions?: { fieldName: string, name: string }[];
    customSorts?: { [fieldName: string]: string[] };
}

export const TasksOverviewDefaultProps: Partial<ITasksOverviewProps> = {
    searchQuery: {
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
            "GtProjectPhase",
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
            name: __.getResource("String_Project"),
            minWidth: 0,
        },
        {
            key: "GtProjectPhase",
            fieldName: "GtProjectPhase",
            name: __.getResource("SiteFields_GtProjectPhase_DisplayName"),
            minWidth: 0,
        },
        {
            key: "StatusOWSCHCS",
            fieldName: "StatusOWSCHCS",
            name: __.getResource("SiteFields_Status_DisplayName"),
            minWidth: 0,
        },
        {
            key: "AssignedTo",
            fieldName: "AssignedTo",
            name: __.getResource("SiteFields_AssignedTo_DisplayName"),
            minWidth: 0,
        },
    ],
    defaultTimeStart: [-1, "months"],
    defaultTimeEnd: [6, "months"],
    groupByOptions: [
        {
            fieldName: "SiteTitle",
            name: __.getResource("String_Project"),
        },
        {
            fieldName: "GtProjectPhase",
            name: __.getResource("SiteFields_GtProjectPhase_DisplayName"),
        },
        {
            fieldName: "StatusOWSCHCS",
            name: __.getResource("SiteFields_Status_DisplayName"),
        },
        {
            fieldName: "AssignedTo",
            name: __.getResource("SiteFields_AssignedTo_DisplayName"),
        },
    ],
    customSorts: { GtProjectPhase: ["Ingen fase", "Flere faser", "Konsept", "Planlegge", "Gjennomføre", "Avslutte", "Realisere"] },
};
