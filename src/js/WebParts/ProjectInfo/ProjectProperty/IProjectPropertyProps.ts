import ProjectPropertyModel from "./ProjectPropertyModel";
import ProjectPropertyDefaultStyle from "./ProjectPropertyDefaultStyle";

interface IProjectPropertyProps extends React.HTMLAttributes<HTMLElement> {
    model: ProjectPropertyModel;
    labelSize?: "mi" | "xs" | "s" | "s-plus" | "m" | "m-plus" | "l" | "xl" | "xxl";
    valueSize?: "mi" | "xs" | "s" | "s-plus" | "m" | "m-plus" | "l" | "xl" | "xxl";
}

export const ProjectPropertyDefaultProps: Partial<IProjectPropertyProps> = {
    style: ProjectPropertyDefaultStyle,
};

export default IProjectPropertyProps;
