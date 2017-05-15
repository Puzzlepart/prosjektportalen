interface IAnnouncementsProps {
    itemsCount?: number;
    itemsFilter?: string;
    itemsOrderBy?: { orderBy: string, ascending: boolean };
    listClassName?: string;
    listId?: string;
    modalHeaderClassName?: string;
    modalBodyClassName?: string;
    modalContainerClassName?: string;
}

export default IAnnouncementsProps;
