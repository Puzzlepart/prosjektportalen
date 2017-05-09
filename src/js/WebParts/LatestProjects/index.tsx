import * as React from "react";
import { Site } from "sp-pnp-js";
import {
    Spinner,
    SpinnerType,
    Icon,
} from "office-ui-fabric-react";
import * as Util from "../../Util";

export interface ILatestProjectsProps {
    itemsCount?: number;
}

export interface ILatestProjectsState {
    subwebs: any[];
    isLoading: boolean;
}

export default class LatestProjects extends React.PureComponent<ILatestProjectsProps, ILatestProjectsState> {
    public static defaultProps = {
        itemsCount: 5,
    };

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            subwebs: null,
            isLoading: true,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        new Site(_spPageContextInfo.siteAbsoluteUrl)
            .rootWeb
            .webinfos
            .top(this.props.itemsCount)
            .select("Id", "ServerRelativeUrl", "Title", "Created")
            .orderBy("Created", false)
            .get().then(subwebs => {
                this.setState({ subwebs: subwebs, isLoading: false });
            }).catch(_ => this.setState({ isLoading: false }));
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        let { subwebs, isLoading } = this.state;
        if (isLoading) {
            return (<Spinner type={SpinnerType.large} />);
        }
        if (subwebs == null) {
            return (<div className="ms-metadata"><Icon iconName="Error" style={{ color: "#000" }} />  {__("WebPart_FailedMessage")}</div>);
        }
        if (subwebs.length > 0) {
            return (<ul className="pp-simpleList spacing-m">
                {subwebs.map(({ Id, ServerRelativeUrl, Title, Created }) => <li key={Id}>
                    <h5><a href={ServerRelativeUrl}>{Title}</a></h5>
                    <div className="ms-metadata">{__("String_Created")} {Util.dateFormat(Created)}</div>
                </li>)}
            </ul>);
        } else {
            return (<div className="ms-metadata">{__("WebPart_EmptyMessage")}</div>);
        }
    }
};
