import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface ILatestProjectsProps extends IBaseWebPartProps {
    itemsCount?: number;
    itemsOrderBy?: { orderBy: string, ascending: boolean };
    reloadInterval?: number;
    listClassName?: string;
    deleteEnabled?: boolean;
}

export const LatestProjectsDefaultProps: Partial<ILatestProjectsProps> = {
    itemsCount: 5,
    itemsOrderBy: {
        orderBy: "Created",
        ascending: false,
    },
    reloadInterval: -1,
    listClassName: "pp-simpleList spacing-m",
    deleteEnabled: process.env.NODE_ENV === "development",
};
