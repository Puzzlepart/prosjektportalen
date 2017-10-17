import RESOURCE_MANAGER from "../../@localization";
import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface ILatestProjectsProps extends IBaseWebPartProps {
    title?: string;
    itemsCount?: number;
    itemsOrderBy?: { orderBy: string, ascending: boolean };
    reloadInterval?: number;
    listClassName?: string;
    deleteEnabled?: boolean;
}

export const LatestProjectsDefaultProps: Partial<ILatestProjectsProps> = {
    title: RESOURCE_MANAGER.getResource("WebPart_RecentProjects_Title"),
    itemsCount: 5,
    itemsOrderBy: {
        orderBy: "Created",
        ascending: false,
    },
    reloadInterval: -1,
    listClassName: "pp-simpleList spacing-m",
    deleteEnabled: process.env.NODE_ENV === "development",
};
