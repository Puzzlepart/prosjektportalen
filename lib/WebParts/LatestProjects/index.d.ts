/// <reference types="react" />
import ILatestProjectsProps from "./ILatestProjectsProps";
import ILatestProjectsState from "./ILatestProjectsState";
import BaseWebPart from "../@BaseWebPart";
export default class LatestProjects extends BaseWebPart<ILatestProjectsProps, ILatestProjectsState> {
    static displayName: string;
    static defaultProps: Partial<ILatestProjectsProps>;
    private reloadInterval;
    /**
     * Constructor
     *
     * @param {ILatestProjectsProps} props Props
     */
    constructor(props: ILatestProjectsProps);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    /**
     * Renders the <LatestProjects /> component
     */
    render(): JSX.Element;
    /**
     * Render items
     */
    private renderItems;
    /**
     * Fetch subwebs for current user using JSOM
     */
    private fetchSubwebsForCurrentUser;
}
export { ILatestProjectsProps, ILatestProjectsState, };
