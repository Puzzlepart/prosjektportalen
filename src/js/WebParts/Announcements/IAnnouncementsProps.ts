interface IAnnouncementsProps {
    itemsCount?: number;
    itemsFilter?: string;
    itemsOrderBy?: { orderBy: string, ascending: boolean };
    listClassName?: string;
    modalHeaderClassName?: string;
    modalBodyClassName?: string;
    modalContainerClassName?: string;
}

export default IAnnouncementsProps;
