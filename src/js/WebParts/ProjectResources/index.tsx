import * as React from "react";
// import RESOURCE_MANAGER from "../../Resources";
import pnp from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import IProjectResourcesProps from "./IProjectResourcesProps";
import IProjectResourcesState from "./IProjectResourcesState";
import BaseWebPart from "../@BaseWebPart";
import List from "../@Components/List";
import ProjectResource from "./ProjectResource";

/**
 * Experience Log
 */
export default class ProjectResources extends BaseWebPart<IProjectResourcesProps, IProjectResourcesState> {
    public static displayName = "ProjectResources";
    protected _columns: Array<IColumn> = [{
        key: "GtResourceUserOWSUSER",
        fieldName: "ResourceUser",
        name: "Navn",
        minWidth: 200,
        maxWidth: 300,
        isResizable: true,
    },
    {
        key: "owstaxIdGtResourceRole",
        fieldName: "ResourceRole",
        name: "Rolle",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    },
    {
        key: "GtStartDateOWSDATE",
        fieldName: "StartDate",
        name: "Startdato",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    },
    {
        key: "GtEndDateOWSDATE",
        fieldName: "EndDate",
        name: "Sluttdato",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    },
    {
        key: "GtProjectPhase",
        fieldName: "ProjectPhase",
        name: "Fase",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
    }];

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
            return <Spinner type={SpinnerType.large} />;
        }

        return (
            <List
                items={this.state.items}
                columns={this._columns} />
        );
    }

    protected async _fetchItems() {
        const searchResults = await pnp.sp.search({
            Querytext: "*",
            QueryTemplate: "ContentTypeId:0x010088578E7470CC4AA68D5663464831070209* Path:{SiteCollection.URL}",
            RowLimit: 500,
            TrimDuplicates: false,
            SelectProperties: ["Path", "SPWebUrl", "SiteTitle", "Title", "GtResourceUserOWSUSER", "owstaxIdGtResourceRole", "GtStartDateOWSDATE", "GtEndDateOWSDATE", "GtProjectPhase"],
        });
        const items = searchResults.PrimarySearchResults.map(r => new ProjectResource(r));
        return items;
    }
}

export {
    IProjectResourcesProps,
    IProjectResourcesState,
};
