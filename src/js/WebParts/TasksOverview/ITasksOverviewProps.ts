import { IBaseWebPartProps } from "../@BaseWebPart";
import { SearchQuery } from "@pnp/sp";

export default interface ITasksOverviewProps extends IBaseWebPartProps {
    searchConfiguration: SearchQuery;
    dataSourceName?: string;
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
            "DisplayAuthor",
            "Created",
            "DueDateOWSDATE",
            "StartDateOWSDATE",
            "LastModifiedTime",
        ],
    },
    dataSourceName: "TASKS",
};
