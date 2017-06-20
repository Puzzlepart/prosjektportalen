import * as uuid_v1 from "uuid/v1";

export interface IQuickLinksProps {
    itemsCount?: number;
    listClassName?: string;
    containerId?: string;
}

export const QuickLinksDefaultProps: Partial<IQuickLinksProps> = {
    itemsCount: 5,
    listClassName: "pp-simpleList spacing-m",
    containerId: uuid_v1(),
};

export default IQuickLinksProps;
