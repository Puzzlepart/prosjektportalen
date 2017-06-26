import * as React from "react";
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
import * as Search from "./Search";
import LogElement from "./LogElement";
import IExperienceLogProps, { ExperienceLogDefaultProps } from "./IExperienceLogProps";
import IExperienceLogState, { ExperienceLogInitialState } from "./IExperienceLogState";

/**
 * Experience Log
 */
export default class ExperienceLog extends React.PureComponent<IExperienceLogProps, IExperienceLogState> {
    public static defaultProps = ExperienceLogDefaultProps;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = ExperienceLogInitialState;
    }

    /**
    * Component did mount
    */
    public componentDidMount(): void {
        this.fetchData()
            .then(updatedState => this.setState({
                ...updatedState,
                isLoading: false,
            }))
            .catch(_ => this.setState({ isLoading: false }));
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        if (this.state.isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }
        const filteredItems = this.state.logItems.filter(logItem => Object.keys(logItem).filter(key => logItem[key].toLowerCase().indexOf(this.state.searchTerm) !== -1).length > 0);
        return (
            <div>
                <SearchBox
                    labelText={__("ExperienceLog_SearchBox_Placeholder")}
                    onChanged={st => this.setState({ searchTerm: st.toLowerCase() })} />
                <DetailsList
                    items={filteredItems}
                    columns={this.props.columns}
                    onRenderItemColumn={this._onRenderItemColumn}
                    constrainMode={this.props.constrainMode}
                    layoutMode={this.props.layoutMode}
                    selectionMode={this.props.selectionMode} />
            </div>
        );
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
            default: {
                return colValue;
            }
        }
    }

    /**
     * Fetch data using sp-pnp-js search
     */
    private fetchData = () => new Promise<Partial<IExperienceLogState>>((resolve, reject) => {
        Search.query(this.props.columns.map(col => col.key))
            .then(response => resolve({ logItems: response.primarySearchResults.map(r => new LogElement(r)) }))
            .catch(reject);
    })
}
