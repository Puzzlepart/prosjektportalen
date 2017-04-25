import * as React from "react";
import { sp } from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react";
import * as Util from "Util";
import { Icon } from "../@Components";

export interface ILatestProjectsState {
    subwebs: any[];
    isLoading: boolean;
}

export default class LatestProjects extends React.PureComponent<any, ILatestProjectsState> {
    constructor() {
        super();
        this.state = {
            subwebs: null,
            isLoading: true,
        };
    }

    public componentDidMount() {
        sp.site.rootWeb.webinfos.top(5).select("Id", "ServerRelativeUrl", "Title", "Created").orderBy("Created", false).get().then(subwebs => {
            this.setState({ subwebs: subwebs, isLoading: false });
        }).catch(_ => this.setState({ isLoading: false }));
    }

    public render() {
        let { subwebs, isLoading } = this.state;
        if (isLoading) {
            return (<Spinner type={SpinnerType.large} />);
        }
        if (subwebs == null) {
            return (<div className="ms-metadata"><Icon name="Error" color="#000" />  {__("WebPart_FailedMessage")}</div>);
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
