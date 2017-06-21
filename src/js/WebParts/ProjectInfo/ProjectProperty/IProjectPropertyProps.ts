import ProjectPropertyModel from "./ProjectPropertyModel";

interface IProjectPropertyProps extends React.HTMLAttributes<HTMLElement> {
    model: ProjectPropertyModel;
    labelSize?: "mi" | "xs" | "s" | "s-plus" | "m" | "m-plus" | "l" | "xl" | "xxl";
    valueSize?: "mi" | "xs" | "s" | "s-plus" | "m" | "m-plus" | "l" | "xl" | "xxl";
}

export default IProjectPropertyProps;
