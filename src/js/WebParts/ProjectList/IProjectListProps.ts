import __ from "../../Resources";
import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IProjectListProps extends IBaseWebPartProps {
    tileWidth?: number;
    tileImageHeight?: number;
    tileClassName?: string;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    projectInfoSortByField?: string;
    dataSourceName?: string;
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
    projectInfoSortByField: "",
    dataSourceName: "PROJECTS",
    rowLimit: 500,
    searchBoxLabelText: __.getResource("DynamicPortfolio_SearchBox_Placeholder"),
    loadingText: __.getResource("ProjectList_LoadingText"),
    emptyMessage: __.getResource("ProjectList_NoResults"),
    propertyClassNames: [],
    searchTimeoutMs: 250,
};

