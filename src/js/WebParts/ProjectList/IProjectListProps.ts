import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IProjectListProps extends IBaseWebPartProps {
    tileWidth?: number;
    tileImageHeight?: number;
    tileClassName?: string;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    masonryOptions?: any;
    rowLimit?: number;
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
};

