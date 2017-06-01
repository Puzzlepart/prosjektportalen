import * as React from "react";
import { Link, animateScroll } from "react-scroll";
import { Icon } from "../../@Components";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import DoExport from "../PDFExport";

const StatusNavigation = (project) => {
    animateScroll.scrollMore(1);

    const nodes = [{
        title: "Status",
        to: "status-section",
        iconName: "BarChart4",
        offset: 0,
    },
    {
        title: "Fremdrift",
        to: "fremdrift-section",
        iconName: "DateTime",
        offset: 0,
    },
    {
        title: "Økonomi",
        to: "budget-section",
        iconName: "Money",
        offset: 0,
    },
    {
        title: "Kvalitet",
        to: "kvalitet-section",
        iconName: "Product",
        offset: 0,
    },
    {
        title: "Risiko",
        to: "risiko-section",
        iconName: "Warning",
        offset: 0,
    },
    {
        title: "Gevinstoppnåelse",
        to: "gevinst-section",
        iconName: "Trophy",
        offset: 0,
    }];

    return (
        <div className="ms-Grid nav-status-container">
            <div className="nav-details ms-Grid-row">
                <div className="ms-Grid-col ms-u-md10 ms-u-lg10">
                    <h2 className="status-page-header">Statusrapport</h2>
                </div>
                <div className=" ms-Grid-col ms-u-md2 ms-u-lg2">
                    <PrimaryButton
                        className="save-pdf-btn"
                        onClick={e => {
                            e.preventDefault();
                            DoExport(project);
                        }}
                        iconProps={{ iconName: "PDF" }}>Eksporter til PDF</PrimaryButton>
                </div>
            </div>
            <div className="nav-links ms-Grid-row">
                {nodes.map(({ title, to, offset, iconName }, idx) => (
                    <Link
                        key={idx}
                        className="nav-link ms-Grid-col ms-u-md2"
                        activeClass="active"
                        to={to}
                        offset={offset}
                        spy={true}
                        smooth={true}
                        duration={300}>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-u-md4 ms-u-lg4">
                                <Icon name={iconName} />
                            </div>
                            <p className="ms-u-hiddenLgDown ms-Grid-col ms-u-md8 ms-u-lg8">{title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StatusNavigation;
