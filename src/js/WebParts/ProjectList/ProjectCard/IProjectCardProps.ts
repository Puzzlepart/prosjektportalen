import Project from "../Project";

interface IProjectCardProps {
    project: Project;
    className: string;
    tileWidth: number;
    tileImageHeight: number;
    onClickHref: string;
    showProjectInfo: (evt: any) => void;
}

export default IProjectCardProps;
