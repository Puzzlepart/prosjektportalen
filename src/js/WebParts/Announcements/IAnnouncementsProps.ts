import { IBaseWebPartProps } from '../@BaseWebPart'

export default interface IAnnouncementsProps extends IBaseWebPartProps {
    itemsCount?: number;
    itemsFilter?: string;
    itemsOrderBy?: { orderBy: string; ascending: boolean };
    listClassName?: string;
    modalHeaderClassName?: string;
    modalBodyClassName?: string;
    modalContainerClassName?: string;
}

export const AnnouncementsDefaultProps: IAnnouncementsProps = {
    itemsCount: 5,
    itemsFilter: `Expires ge datetime'${new Date().toISOString()}'`,
    itemsOrderBy: {
        orderBy: 'Created',
        ascending: false,
    },
    listClassName: 'pp-simpleList spacing-s',
    modalContainerClassName: 'pp-announcementsModalContainer',
    modalHeaderClassName: 'ms-font-xxl',
    modalBodyClassName: 'ms-font-l',
}

