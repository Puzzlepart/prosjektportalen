import * as uuid_v1 from "uuid/v1";

interface IAnnouncementsProps {
    itemsCount?: number;
    itemsFilter?: string;
    itemsOrderBy?: { orderBy: string, ascending: boolean };
    listClassName?: string;
    containerId?: string;
    modalHeaderClassName?: string;
    modalBodyClassName?: string;
    modalContainerClassName?: string;
}

export const AnnouncementsDefaultProps: IAnnouncementsProps = {
    itemsCount: 5,
    itemsFilter: `Expires ge datetime'${new Date().toISOString()}'`,
    itemsOrderBy: {
        orderBy: "Created",
        ascending: false,
    },
    listClassName: "pp-simpleList spacing-s",
    containerId: uuid_v1(),
    modalContainerClassName: "pp-announcementsModalContainer",
    modalHeaderClassName: "ms-font-xxl",
    modalBodyClassName: "ms-font-l",
};

export default IAnnouncementsProps;
