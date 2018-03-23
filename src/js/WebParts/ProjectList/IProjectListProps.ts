import RESOURCE_MANAGER from "../../Resources";
import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IProjectListProps extends IBaseWebPartProps {
    tileWidth?: number;
    tileImageHeight?: number;
    tileClassName?: string;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    masonryOptions?: any;
    rowLimit?: number;
    searchBoxLabelText?: string;
    loadingText?: string;
    emptyMessage?: string;
    propertyClassNames?: string[];
    searchTimeoutMs?: number;
}

export const ProjectListDefaultProps: Partial<IProjectListProps> = {
    tileWidth: 206,
    tileImageHeight: 140,
    tileClassName: "pp-projectCard",
    modalHeaderClassName: "ms-font-xxl",
    projectInfoFilterField: "GtPcPortfolioPage",
    masonryOptions: {
        transitionDuration: "slow",
        gutter: 10,
    },
    rowLimit: 500,
    searchBoxLabelText: RESOURCE_MANAGER.getResource("DynamicPortfolio_SearchBox_Placeholder"),
    loadingText: RESOURCE_MANAGER.getResource("ProjectList_LoadingText"),
    emptyMessage: RESOURCE_MANAGER.getResource("ProjectList_NoResults"),
    propertyClassNames: [],
    searchTimeoutMs: 250,
};

