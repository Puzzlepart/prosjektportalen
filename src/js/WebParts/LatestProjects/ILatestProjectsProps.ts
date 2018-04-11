import RESOURCE_MANAGER from "../../Resources";
import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface ILatestProjectsProps extends IBaseWebPartProps {
    chromeTitle?: string;
    itemsCount?: number;
    reloadInterval?: number;
    listClassName?: string;
    loadingText?: string;
}

export const LatestProjectsDefaultProps: Partial<ILatestProjectsProps> = {
    chromeTitle: RESOURCE_MANAGER.getResource("WebPart_RecentProjects_Title"),
    itemsCount: 5,
    reloadInterval: -1,
    listClassName: "pp-simpleList spacing-m",
    loadingText: RESOURCE_MANAGER.getResource("LatestProjects_LoadingText"),
};
