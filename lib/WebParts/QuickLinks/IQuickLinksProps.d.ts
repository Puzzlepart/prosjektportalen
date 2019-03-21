import { IBaseWebPartProps } from "../@BaseWebPart";
interface IQuickLinksProps extends IBaseWebPartProps {
    itemsCount?: number;
    orderBy?: string;
    orderAsc?: boolean;
    listClassName?: string;
}
export default IQuickLinksProps;
