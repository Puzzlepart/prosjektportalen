import * as pnp from "sp-pnp-js";
import * as React from "react";

export default class QuickLinks extends React.PureComponent<any, any> {
    constructor() {
        super();
        this.state = {
            links: null,
            dataFetched: false,
        };
    }

    public componentDidMount() {
        pnp.sp.web.lists.getByTitle(__("Lists_QuickLinks_Title")).items.select("URL", "Comments").get().then(links => this.setState({ links: links, dataFetched: true }));
    }

    public render() {
        let { links, dataFetched } = this.state;
        if (!dataFetched) {
            return null;
        }
        if (links.length > 0) {
            return (<ul className="pp-simpleList spacing-m">
                {links.map(({ URL: { Url, Description }, Comments }, idx) => <li key={idx}>
                    <h5><a href={Url}>{Description}</a></h5>
                    <span className="ms-metadata">{Comments}</span>
                </li>)}
            </ul>);
        } else {
            return (<div className="ms-metadata">{__("WebPart_EmptyMessage")}</div>);
        }
    }
};
