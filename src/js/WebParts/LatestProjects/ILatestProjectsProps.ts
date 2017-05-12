interface ILatestProjectsProps {
    itemsCount?: number;
    itemsOrderBy?: { orderBy: string, ascending: boolean };
    reloadIntervalMs?: number;
    listClassName?: string;
    listId?: string;
}

export default ILatestProjectsProps;
