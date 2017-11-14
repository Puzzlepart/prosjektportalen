import * as React from "react";
import RESOURCE_MANAGER from "../../@localization";
import {
    DetailsList,
    IColumn,
} from "office-ui-fabric-react/lib/DetailsList";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { ModalLink } from "../../WebParts/@Components";
import { queryLogElements } from "./ExperienceLogSearch";
import LogElement from "./LogElement";
import IExperienceLogProps, { ExperienceLogDefaultProps } from "./IExperienceLogProps";
import IExperienceLogState from "./IExperienceLogState";
import BaseWebPart from "../@BaseWebPart";

/**
 * Experience Log
 */
export default class ExperienceLog extends BaseWebPart<IExperienceLogProps, IExperienceLogState> {
    public static displayName = "ExperienceLog";
    public static defaultProps = ExperienceLogDefaultProps;

    /**
     * Constructor
     *
     * @param {IExperienceLogProps} props Props
     */
    constructor(props: IExperienceLogProps) {
        super(props, {
            isLoading: true,
            searchTerm: "",
        });
    }

    /**
    * Component did mount
    */
    public async componentDidMount() {
        try {
            const data = await this.fetchData();
            this.setState({
                ...data,
                isLoading: false,
            });
        } catch (err) {
            this.setState({ isLoading: false });
        }
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        if (this.state.isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }

        return (
            <div>
                <SearchBox
                    labelText={RESOURCE_MANAGER.getResource("ExperienceLog_SearchBox_Placeholder")}
                    onChanged={st => this.setState({ searchTerm: st.toLowerCase() })} />
                <DetailsList
                    items={this.getFilteredItems()}
                    columns={this.props.columns}
                    onRenderItemColumn={this._onRenderItemColumn}
                    constrainMode={this.props.constrainMode}
                    layoutMode={this.props.layoutMode}
                    selectionMode={this.props.selectionMode} />
            </div>
        );
    }

    private getFilteredItems() {
        return this.state.logItems
            .filter(itm => {
                const matches = Object.keys(itm).filter(key => {
                    const value = itm[key];
                    return value && typeof value === "string" && value.toLowerCase().indexOf(this.state.searchTerm) !== -1;
                }).length;
                return matches > 0;
            })
            .sort((a, b) => a.Title > b.Title ? 1 : -1);
    }

    /**
     * On render item column
     *
     * @param item The item
     * @param index The index
     * @param column The column
     */
    private _onRenderItemColumn = (item: any, index: number, column: IColumn): any => {
        let colValue = item[column.fieldName];
        switch (column.key) {
            case "Title": {
                let dispFormUrl = item.Path;
                return (
                    <ModalLink
                        label={colValue}
                        url={dispFormUrl}
                        options={{ HideRibbon: true }} />
                );
            }
            case "SiteTitle": {
                return (
                    <a href={item.SPWebUrl}>{item.SiteTitle}</a>
                );
            }
            default: {
                return colValue;
            }
        }
    }

    /**
     * Fetch data using sp-pnp-js search
     */
    private async fetchData(): Promise<Partial<IExperienceLogState>> {
        try {
            const response = await queryLogElements(this.props.columns.map(col => col.key));
            return ({ logItems: response.primarySearchResults.map(r => new LogElement(r)) });
        } catch (err) {
            throw err;
        }
    }
}

export {
    IExperienceLogProps,
    IExperienceLogState,
};
