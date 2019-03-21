import { IBaseWebPartProps } from "../@BaseWebPart";
export default interface IProjectListProps extends IBaseWebPartProps {
    tileWidth?: number;
    tileImageHeight?: number;
    tileClassName?: string;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    dataSourceName?: string;
    rowLimit?: number;
    searchBoxLabelText?: string;
    loadingText?: string;
    emptyMessage?: string;
    propertyClassNames?: string[];
    searchTimeoutMs?: number;
}
export declare const ProjectListDefaultProps: Partial<IProjectListProps>;
