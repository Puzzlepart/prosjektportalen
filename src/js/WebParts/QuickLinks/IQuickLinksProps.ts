import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IQuickLinksProps extends IBaseWebPartProps {
    itemsCount?: number;
    listClassName?: string;
}

export const QuickLinksDefaultProps: Partial<IQuickLinksProps> = {
    itemsCount: 5,
    listClassName: "pp-simpleList spacing-m",
};

