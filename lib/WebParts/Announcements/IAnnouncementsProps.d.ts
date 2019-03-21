import { IBaseWebPartProps } from "../@BaseWebPart";
export default interface IAnnouncementsProps extends IBaseWebPartProps {
    itemsCount?: number;
    itemsFilter?: string;
    itemsOrderBy?: {
        orderBy: string;
        ascending: boolean;
    };
    listClassName?: string;
    modalHeaderClassName?: string;
    modalBodyClassName?: string;
    modalContainerClassName?: string;
}
export declare const AnnouncementsDefaultProps: IAnnouncementsProps;
