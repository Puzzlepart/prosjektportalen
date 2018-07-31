import * as React from "react";
import __ from "../../Resources";
import pnp from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import IProjectResourcesProps, { ProjectResourcesDefaultProps } from "./IProjectResourcesProps";
import IProjectResourcesState from "./IProjectResourcesState";
import BaseWebPart from "../@BaseWebPart";
import List from "../@Components/List";
import ProjectResource from "./ProjectResource";

/**
 * Experience Log
 */
export default class ProjectResources extends BaseWebPart<IProjectResourcesProps, IProjectResourcesState> {
    public static displayName = "ProjectResources";
    public static defaultProps = ProjectResourcesDefaultProps;

    /**
     * Constructor
     *
     * @param {IProjectResourcesProps} props Props
     */
    constructor(props: IProjectResourcesProps) {
        super(props, { isLoading: true });
    }

    public async componentDidMount(): Promise<void> {
        try {
            const items = await this._fetchItems();
            this.setState({ items, isLoading: false });
        } catch (err) {
            this.setState({ items: [], isLoading: false });
        }
    }

    /**
     * Renders the <ProjectResources /> component
     */
    public render(): JSX.Element {
        if (this.state.isLoading) {
            return (
                <Spinner
                    type={SpinnerType.large}
                    label={__.getResource("ProjectResources_LoadingText")} />
            );
        }

        return (
            <List
                items={this.state.items}
                columns={this.props.columns}
                showCommandBar={true}
                groupByOptions={this.props.groupByOptions} />
        );
    }

    /**
     * Fetch items
     */
    protected async _fetchItems() {
        const searchResults = await pnp.sp.search({
            Querytext: "*",
            QueryTemplate: "ContentTypeId:0x010088578E7470CC4AA68D5663464831070209* Path:{SiteCollection.URL}",
            RowLimit: 500,
            TrimDuplicates: false,
            SelectProperties: ["Path", "SPWebUrl", ...this.props.columns.map(col => col.key)],
        });
        const items = searchResults.PrimarySearchResults.map(r => new ProjectResource(r));
        return items;
    }
}

export {
    IProjectResourcesProps,
    IProjectResourcesState,
};
