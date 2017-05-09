import * as React from "react";
import { NewProjectDialog } from "./NewProjectDialog";

export interface INewProjectLinkProps { }
export interface INewProjectLinkState {
    showDialog: boolean;
}

/**
 * New Project link
 */
export default class NewProjectLink extends React.PureComponent<INewProjectLinkProps, INewProjectLinkState> {
    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            showDialog: false,
        };
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        let { showDialog } = this.state;
        return (<div className="container">
            <a className="ms-font-l" href="#" onClick={e => this.setState({ showDialog: true })}>
                <i className="ms-Icon ms-Icon--CirclePlus" aria-hidden="true" style={{ verticalAlign: "bottom", marginRight: 5 }}></i>
                <span>{__("NewProjectForm_Header")}</span>
            </a>
            {showDialog && <NewProjectDialog className="pp-newprojectdialog" hideHandler={e => this.setState({ showDialog: false })} />}
        </div>);
    }
};
