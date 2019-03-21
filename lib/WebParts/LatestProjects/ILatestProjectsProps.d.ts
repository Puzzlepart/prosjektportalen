import { IBaseWebPartProps } from "../@BaseWebPart";
export default interface ILatestProjectsProps extends IBaseWebPartProps {
    chromeTitle?: string;
    itemsCount?: number;
    listClassName?: string;
    loadingText?: string;
}
export declare const LatestProjectsDefaultProps: Partial<ILatestProjectsProps>;
