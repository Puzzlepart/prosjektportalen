import * as pnp from "sp-pnp-js";
import * as React from "react";
import * as Util from "Util";

export default class Announcements extends React.PureComponent<any, any> {
    constructor() {
        super();
        this.state = {
            entries: null,
            dataFetched: false,
        };
    }

    public componentDidMount() {
        pnp.sp.web.lists.getByTitle(__("Lists_Announcements_Title")).items.get().then(entries => {
            this.setState({ entries: entries, dataFetched: true });
        });
    }

    public render() {
        let { entries, dataFetched } = this.state;
        if (!dataFetched) {
            return null;
        }
        if (entries.length > 0) {
            return (<ul className="pp-simpleList spacing-s">
                {entries.map(({ Title, Created }, idx) => <li key={idx}>
                    <h5><a href="#">{Title}</a></h5>
                    <span className="ms-metadata">{__("String_Published")} {Util.dateFormat(Created)}</span>
                </li>)}
            </ul>);
        } else {
            return (<div className="ms-metadata">{__("WebPart_EmptyMessage")}</div>);
        }
    }

};
