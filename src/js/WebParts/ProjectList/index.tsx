import * as React from "react";
import Masonry from "react-masonry-component";
import {
    DocumentCard,
    DocumentCardPreview,
    DocumentCardTitle,
    DocumentCardType,
    ImageFit,
    Spinner,
    SpinnerType,
    SearchBox,
} from "office-ui-fabric-react";
import * as Search from "./Search";
import Style from "./Style";

interface IProjectListState {
    isLoading: boolean;
    projects?: any[];
    searchTerm?: string;
}

interface IProjectListProps {
    tileWidth?: number;
    tileImageHeight?: number;
    tileGutter?: number;
    tileClassName?: string;
}

/**
 * Project information
 */
export default class ProjectList extends React.PureComponent<IProjectListProps, IProjectListState> {
    public static defaultProps: Partial<IProjectListProps> = {
        tileWidth: 206,
        tileImageHeight: 140,
        tileGutter: 5,
        tileClassName: "pp-projectCard",
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
        const {
            isLoading,
            projects,
            searchTerm,
        } = this.state;

        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }

        return <div style={{ paddingRight: 40 }}>
            <SearchBox
                labelText={__("DynamicPortfolio_SearchBox_Placeholder")}
                onChanged={st => this.setState({ searchTerm: st })} />
            <Masonry
                elementType={"div"}
                options={{
                    transitionDuration: "slow",
                    gutter: this.props.tileGutter,
                }}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}>
                {projects
                    .filter(({ Title }) => Title.indexOf(searchTerm) !== -1)
                    .map(({ Title, Path, SiteLogo }) => (
                        <DocumentCard
                            className={this.props.tileClassName}
                            type={DocumentCardType.normal}>
                            <DocumentCardPreview previewImages={[
                                {
                                    previewImageSrc: SiteLogo,
                                    imageFit: ImageFit.cover,
                                    accentColor: "#ce4b1f",
                                    width: this.props.tileWidth,
                                    height: this.props.tileImageHeight,
                                },
                            ]} />
                            <DocumentCardTitle
                                title={Title}
                                shouldTruncate={true} />
                        </DocumentCard>
                    ))}
            </Masonry>
            <Style props={this.props} />
        </div>;
    }

    /**
     * Fetch data using sp-pnp-js search
     */
    private fetchData = () => new Promise<Partial<IProjectListState>>((resolve, reject) => {
        Search.query()
            .then(({ primarySearchResults }) => resolve({ projects: primarySearchResults }))
            .catch(reject);
    })
};
