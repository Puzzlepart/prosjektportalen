import * as React from "react";
import {
    DetailsList,
    SelectionMode,
    ConstrainMode,
    DetailsListLayoutMode,
} from "office-ui-fabric-react/lib/DetailsList";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import * as Search from "./Search";
import IExperienceLogProps from "./IExperienceLogProps";
import IExperienceLogState, { LogElement } from "./IExperienceLogState";

/**
 * Project information
 */
export default class ProjectList extends React.PureComponent<IExperienceLogProps, IExperienceLogState> {
    /**
     * Default properties
     */
    public static defaultProps: Partial<IExperienceLogProps> = {
        constrainMode: ConstrainMode.horizontalConstrained,
        layoutMode: DetailsListLayoutMode.fixedColumns,
        selectionMode: SelectionMode.none,
        columns: [{
            key: "Title",
            fieldName: "Title",
            name: "Tittel",
            minWidth: 220,
        },
        {
            key: "SiteTitle",
            fieldName: "SiteTitle",
            name: "Prosjekt",
        },
        {
            key: "GtProjectLogDescriptionOWSMTXT",
            fieldName: "Description",
            name: "Beskrivelse",
        },
        {
            key: "GtProjectLogResponsibleOWSCHCS",
            fieldName: "Responsible",
            name: "Ansvarlig",
        },
        {
            key: "GtProjectLogConsequenceOWSMTXT",
            fieldName: "Consequence",
            name: "Konsekvens",
        },
        {
            key: "GtProjectLogRecommendationOWSMTXT",
            fieldName: "Recommendation",
            name: "Anbefaling",
        },
        {
            key: "GtProjectLogActorsOWSCHCM",
            fieldName: "Actors",
            name: "Aktører",
        }].map(col => ({
            ...col,
            isResizable: true,
        })),
    };

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            isLoading: true,
            searchTerm: "",
        };
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
        return (
            <div>
                <SearchBox
                    labelText="Søk i alle loggelementer"
                    onChanged={st => this.setState({ searchTerm: st.toLowerCase() })} />
                <DetailsList
                    items={this.state.logItems.filter(logItem => Object.keys(logItem).filter(key => logItem[key].toLowerCase().indexOf(this.state.searchTerm) !== -1).length > 0)}
                    columns={this.props.columns}
                    constrainMode={this.props.constrainMode}
                    layoutMode={this.props.layoutMode}
                    selectionMode={this.props.selectionMode} />
            </div>
        );
    }

    /**
     * Fetch data using sp-pnp-js search
     */
    private fetchData = () => new Promise<Partial<IExperienceLogState>>((resolve, reject) => {
        Search.query(this.props.columns.map(col => col.key))
            .then(response => resolve({ logItems: response.primarySearchResults.map(r => new LogElement(r)) }))
            .catch(reject);
    })
};
