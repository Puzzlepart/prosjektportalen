import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IQuickLinksProps extends IBaseWebPartProps {
    itemsCount?: number;
    listClassName?: string;
}

export const QuickLinksDefaultProps: Partial<IQuickLinksProps> = {
    itemsCount: 10,
    listClassName: "pp-simpleList spacing-m",
};

