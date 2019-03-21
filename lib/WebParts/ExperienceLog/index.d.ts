/// <reference types="react" />
import IExperienceLogProps from "./IExperienceLogProps";
import IExperienceLogState from "./IExperienceLogState";
import BaseWebPart from "../@BaseWebPart";
import LogElement from "./LogElement";
/**
 * Experience Log
 */
export default class ExperienceLog extends BaseWebPart<IExperienceLogProps, IExperienceLogState> {
    static displayName: string;
    static defaultProps: Partial<IExperienceLogProps>;
    /**
     * Constructor
     *
     * @param {IExperienceLogProps} props Props
     */
    constructor(props: IExperienceLogProps);
    componentDidMount(): Promise<void>;
    /**
     * Renders the <ExperienceLog /> component
     */
    render(): JSX.Element;
    /**
     * Fetch items
     */
    protected _fetchItems(): Promise<LogElement[]>;
}
export { IExperienceLogProps, IExperienceLogState, };
