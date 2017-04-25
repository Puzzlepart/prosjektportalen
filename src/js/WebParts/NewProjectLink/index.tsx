import * as React from "react";
import { NewProjectDialog } from "./NewProjectDialog";

export default class NewProjectLink extends React.PureComponent<any, any> {
    constructor() {
        super();
        this.state = {
            showDialog: false,
        };
    }

    public render() {
        let { showDialog } = this.state;
        return (<div className="container">
            <a className="ms-font-l" href="#" onClick={this.showDialog}>
                <i className="ms-Icon ms-Icon--CirclePlus" aria-hidden="true" style={{ verticalAlign: "bottom", marginRight: 5 }}></i>
                <span>{__("NewProjectForm_Header")}</span>
            </a>
            {showDialog && <NewProjectDialog className="pp-newprojectdialog" hideHandler={this.hideDialog} />}
        </div>);
    }

    private showDialog = (event) => {
        event.preventDefault();
        this.setState({ showDialog: true });
    }

    private hideDialog = (event) => {
        event.preventDefault();
        this.setState({ showDialog: false });
    }
};
