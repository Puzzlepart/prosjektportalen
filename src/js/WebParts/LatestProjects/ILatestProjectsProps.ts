import RESOURCE_MANAGER from "../../@localization";
import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface ILatestProjectsProps extends IBaseWebPartProps {
    chromeTitle?: string;
    itemsCount?: number;
    itemsOrderBy?: { orderBy: string, ascending: boolean };
    reloadInterval?: number;
    listClassName?: string;
    deleteEnabled?: boolean;
    loadingText?: string;
    underCreationLabel?: string;
}

export const LatestProjectsDefaultProps: Partial<ILatestProjectsProps> = {
    chromeTitle: RESOURCE_MANAGER.getResource("WebPart_RecentProjects_Title"),
    itemsCount: 5,
    itemsOrderBy: {
        orderBy: "Created",
        ascending: false,
    },
    reloadInterval: -1,
    listClassName: "pp-simpleList spacing-m",
    deleteEnabled: process.env.NODE_ENV === "development",
    loadingText: RESOURCE_MANAGER.getResource("LatestProjects_LoadingText"),
    underCreationLabel: RESOURCE_MANAGER.getResource("LatestProjects_ProjectUnderCreation"),
};
