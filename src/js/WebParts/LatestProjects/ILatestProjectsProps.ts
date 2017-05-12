interface ILatestProjectsProps {
    itemsCount?: number;
    itemsOrderBy?: { orderBy: string, ascending: boolean };
    reloadInterval?: number;
    listClassName?: string;
    listId?: string;
}

export default ILatestProjectsProps;
