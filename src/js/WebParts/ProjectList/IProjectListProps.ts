import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IProjectListProps extends IBaseWebPartProps {
    tileWidth?: number;
    tileImageHeight?: number;
    tileClassName?: string;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    masonryOptions?: any;
}

