import * as React from "react";
import * as html2canvas from "html2canvas";
import * as pnp from "sp-pnp-js";
import * as moment from "moment";
import { Link, animateScroll } from "react-scroll";
import { Icon } from "../../@Components";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";

const saveFileToLibrary = (libraryRelativeUrl: string, fileName: string, title: string, fileBlob: Blob): Promise<any> => {
    return pnp.sp.web.getFolderByServerRelativeUrl(libraryRelativeUrl).files.add(fileName, fileBlob, true).then((fileAddResult) => {
        return fileAddResult.file.listItemAllFields.get().then((fileAllFields) => {
            return pnp.sp.web.lists.getByTitle("Prosjektstatusrapporter").items.getById(fileAllFields.Id).update({
                "Title": title,
            });
        });
    });
};

const StatusNavigation = () => {
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
                <div className=" ms-Grid-col ms-u-md8 ms-u-lg8">
                    <h2 style={{ color: "#fff", paddingTop: 10, paddingBottom: 10 }}>{`Statusrapport: ${_spPageContextInfo.webTitle}`}</h2>
                </div>
                <div className=" ms-Grid-col ms-u-md4 ms-u-lg4">
                    <PrimaryButton
                        className="save-pdf-btn"
                        iconProps={{ iconName: "Image" }}
                        onClick={e => {
                            e.preventDefault();
                            html2canvas(document.getElementById("pp-projectstatus"), {
                                onrendered: function (canvas) {
                                    canvas.toBlob((reportBlob) => {
                                        let fileName = `${_spPageContextInfo.webTitle}-${moment(new Date()).format("YYYY-MM-D-HHmm")}.png`;
                                        let fileTitle = `${_spPageContextInfo.webTitle} prosjektrapport ${moment(new Date()).format("YYYY-MM-D-HHmm")}`;
                                        saveFileToLibrary(`${_spPageContextInfo.webServerRelativeUrl}/Prosjektstatusrapporter`, fileName, fileTitle, reportBlob).then((data) => {
                                            console.log("Saved image");
                                        });
                                    });
                                },
                            });
                        }}>Lagre øyeblikksbilde</PrimaryButton>
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
