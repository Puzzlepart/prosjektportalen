//#region Imports
import * as React from "react";
import RESOURCE_MANAGER from "../../Resources";
import { CreateJsomContext, ExecuteJsomQuery } from "jsom-ctx";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as Util from "../../Util";
import ILatestProjectsProps, { LatestProjectsDefaultProps } from "./ILatestProjectsProps";
import ILatestProjectsState from "./ILatestProjectsState";
import BaseWebPart from "../@BaseWebPart";
//#endregion

export default class LatestProjects extends BaseWebPart<ILatestProjectsProps, ILatestProjectsState> {
    public static displayName = "LatestProjects";
    public static defaultProps = LatestProjectsDefaultProps;

    private reloadInterval: number;

    /**
     * Constructor
     *
     * @param {ILatestProjectsProps} props Props
     */
    constructor(props: ILatestProjectsProps) {
        super(props, {
            isLoading: true,
            subwebs: null,
        });
    }

    public async componentDidMount() {
        try {
            const subwebs = await this.fetchSubwebsForCurrentUser();
            this.setState({ subwebs, isLoading: false });
        } catch (err) {
            this.setState({ isLoading: false });
        }
    }

    public componentWillUnmount(): void {
        window.clearInterval(this.reloadInterval);
    }

    /**
     * Renders the <LatestProjects /> component
     */
    public render(): JSX.Element {
        return (
            <div>
                {this._renderChrome(this.props.chromeTitle, this.state.elementToToggle, LatestProjects.displayName)}
                {this.renderItems()}
            </div>
        );
    }

    /**
     * Render items
     */
    private renderItems() {
        const { isLoading, subwebs } = this.state;

        if (isLoading) {
            return <Spinner type={SpinnerType.large} label={this.props.loadingText} />;
        } else if (subwebs == null) {
            return (
                <div className="ms-font-xs">
                    <Icon iconName="Error" style={{ color: "#000" }} />  {RESOURCE_MANAGER.getResource("WebPart_FailedMessage")}
                </div>
            );
        } else if (subwebs.length > 0) {
            return (
                <div ref={elementToToggle => this.setState({ elementToToggle })}>
                    <ul className={this.props.listClassName}>
                        {subwebs.map(({ Title, Url, Created }, index) => (
                            <li key={`Project_${index}`}>
                                <div>
                                    <h5><a href={Url}>{Title}</a></h5>
                                    <div className="ms-font-xs">{RESOURCE_MANAGER.getResource("String_Created")} {Util.dateFormat(Created)}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div ref={elementToToggle => this.setState({ elementToToggle })}>
                    <MessageBar>{RESOURCE_MANAGER.getResource("WebPart_EmptyMessage")}</MessageBar>
                </div>
            );
        }
    }

    /**
     * Fetch subwebs for current user using JSOM
     */
    private async fetchSubwebsForCurrentUser(): Promise<any> {
        const jsomCtx = await CreateJsomContext(_spPageContextInfo.webAbsoluteUrl);
        const webCollection: SP.WebCollection = await jsomCtx.web.getSubwebsForCurrentUser(null);
        await ExecuteJsomQuery(jsomCtx, [{ clientObject: webCollection }]);
        const subwebs = webCollection.get_data()
            .map(web => ({
                Title: web.get_title(),
                Url: web.get_url(),
                Created: web.get_created(),
            }))
            .sort((a, b) => {
                const aCreatedTime = a.Created.getTime();
                const bCreatedTime = b.Created.getTime();
                if (aCreatedTime < bCreatedTime) {
                    return 1;
                }
                if (aCreatedTime > bCreatedTime) {
                    return -1;
                }
                return 0;
            })
            .splice(0, this.props.itemsCount);
        return subwebs;
    }
}

export {
    ILatestProjectsProps,
    ILatestProjectsState,
};
