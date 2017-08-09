import * as React from "react";
import { Icon} from "office-ui-fabric-react/lib/Icon";
import { Link } from "react-scroll";
import ExportReport from "../ExportReport";

const Navigation = ({ project, sections }) => {
    return (
        <div className="ms-Grid nav-status-container">
            <div className="nav-details ms-Grid-row">
                <div className="ms-Grid-col ms-md6">
                    <h2 className="status-page-header">{`${__("String_StatusReport")}: ${_spPageContextInfo.webTitle}`}</h2>
                </div>
                <div className=" ms-Grid-col ms-md6">
                    <ExportReport project={project} />
                </div>
            </div>
            <div className="nav-links ms-Grid-row">
                {sections.map((s, key) => (
                    <Link
                        key={key}
                        className="nav-link ms-Grid-col ms-md2"
                        activeClass="active"
                        to={"to"}
                        offset={-100}
                        spy={true}
                        smooth={true}
                        duration={300}>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-md4 ms-lg4">
                                <Icon iconName={s.Icon} />
                            </div>
                            <p className="ms-hiddenLgDown ms-Grid-col ms-md8 ms-lg8">{s.Title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Navigation;
