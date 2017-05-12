import IProject from "../IProject";

interface IProjectCardProps {
    project: IProject;
    className: string;
    tileWidth: number;
    tileImageHeight: number;
    onClickHref: string;
    showProjectInfo: (evt: any) => void;
}

export default IProjectCardProps;
