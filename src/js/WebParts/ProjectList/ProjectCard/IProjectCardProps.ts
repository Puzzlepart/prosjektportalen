import Project from "../Project";

interface IProjectCardProps {
    project: Project;
    fields: { [key: string]: string };
    className: string;
    tileWidth: number;
    tileImageHeight: number;
    onClickHref: string;
    showProjectInfo: (evt: any) => void;
}

export default IProjectCardProps;
