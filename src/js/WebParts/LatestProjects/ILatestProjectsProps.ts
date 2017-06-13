import * as uuid_v1 from "uuid/v1";

interface ILatestProjectsProps {
    itemsCount?: number;
    itemsOrderBy?: { orderBy: string, ascending: boolean };
    reloadInterval?: number;
    listClassName?: string;
    listId?: string;
    deleteEnabled?: boolean;
}

export const LatestProjectsDefaultProps: Partial<ILatestProjectsProps> = {
    itemsCount: 5,
    itemsOrderBy: {
        orderBy: "Created",
        ascending: false,
    },
    reloadInterval: -1,
    listClassName: "pp-simpleList spacing-m",
    listId: uuid_v1(),
    deleteEnabled: process.env.NODE_ENV === "development",
};

export default ILatestProjectsProps;
