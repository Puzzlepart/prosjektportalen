import * as uuid_v1 from "uuid/v1";
import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IQuickLinksProps extends IBaseWebPartProps {
    itemsCount?: number;
    listClassName?: string;
    containerId?: string;
}

export const QuickLinksDefaultProps: Partial<IQuickLinksProps> = {
    itemsCount: 5,
    listClassName: "pp-simpleList spacing-m",
    containerId: uuid_v1(),
};

