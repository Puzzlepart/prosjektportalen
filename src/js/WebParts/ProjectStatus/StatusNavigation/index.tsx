import * as React from "react";
import { Link, animateScroll } from "react-scroll";
import { Sticky } from "react-sticky";
import { Icon } from "../../@Components";

const StatusNavigation = () => {
    animateScroll.scrollMore(1);

    const nodes = [{
        title: "Status",
        to: "status-section",
        iconName: "BarChart4",
        offset: -450,
    },
    {
        title: "Fremdrift",
        to: "fremdrift-section",
        iconName: "DateTime",
        offset: -100,
    },
    {
        title: "Økonomi",
        to: "budget-section",
        iconName: "Money",
        offset: -100,
    },
    {
        title: "Kvalitet",
        to: "kvalitet-section",
        iconName: "Product",
        offset: -100,
    },
    {
        title: "Risiko",
        to: "risiko-section",
        iconName: "Warning",
        offset: -100,
    },
    {
        title: "Gevinstoppnåelse",
        to: "gevinst-section",
        iconName: "Trophy",
        offset: -100,
    }];

    return (
        <Sticky className="nav-status-container ">
            <div className="ms-Grid">
                <div className="nav-details ms-Grid-row">
                    <div className=" ms-Grid-col ms-u-md8 ms-u-lg8">
                        <h2 style={{ color: "#fff", paddingTop: 10, paddingBottom: 10 }}>Statusrapport</h2>
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
        </Sticky>
    );

};

export default StatusNavigation;
