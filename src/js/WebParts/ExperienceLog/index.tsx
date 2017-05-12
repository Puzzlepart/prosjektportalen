import * as React from "react";
import {
    Spinner,
    SpinnerType,
    SearchBox,
} from "office-ui-fabric-react";
import * as Search from "./Search";
import IExperienceLogProps from "./IExperienceLogProps";
import IExperienceLogState from "./IExperienceLogState";

/**
 * Project information
 */
export default class ProjectList extends React.PureComponent<IExperienceLogProps, IExperienceLogState> {
    public static defaultProps: Partial<IExperienceLogProps> = {};

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

        return null;
    }

    /**
     * Fetch data using sp-pnp-js search
     */
    private fetchData = () => new Promise<Partial<IExperienceLogProps>>((resolve, reject) => {
        Search.query()
            .then(({ primarySearchResults }) => resolve({ logItems: primarySearchResults }))
            .catch(reject);
    })
};
