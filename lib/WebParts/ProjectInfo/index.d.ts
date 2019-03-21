/// <reference types="react" />
import IProjectInfoProps from "./IProjectInfoProps";
import IProjectInfoState from "./IProjectInfoState";
import ProjectInfoRenderMode from "./ProjectInfoRenderMode";
import BaseWebPart from "../@BaseWebPart";
/**
 * Project information
 */
export default class ProjectInfo extends BaseWebPart<IProjectInfoProps, IProjectInfoState> {
    static displayName: string;
    static defaultProps: Partial<IProjectInfoProps>;
    /**
     * Constructor
     *
     * @param {IProjectInfoProps} props Props
     */
    constructor(props: IProjectInfoProps);
    componentDidMount(): Promise<void>;
    render(): JSX.Element;
    /**
     * Render inner
     */
    private renderInner;
    /**
     * Render properties
     */
    private renderProperties;
    /**
     * Render action links
     */
    private renderActionLinks;
    /**
     * Fetch data. Config, fields and project frontpage data.
     *
     * @param {string} configList Configuration list
     */
    private fetchData;
}
export { ProjectInfoRenderMode, IProjectInfoProps, IProjectInfoState };
