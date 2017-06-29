import * as React from "react";
import { ChromeTitle, ModalLink } from "../../WebParts/@Components";

const LogElement = ({ data }) => {
    let dispFormUrl = `${_spPageContextInfo.webAbsoluteUrl}/${__("DefaultView_ProjectLog_Url")}?ID=${data.ID}`.replace("AllItems", "DispForm");
    return (
        <li>
            <h3>
                <ModalLink
                    label={data.Title}
                    url={dispFormUrl}
                    options={{ HideRibbon: true }} />
            </h3>
            <p className="ms-metadata">{data.GtProjectLogDescription}</p>
        </li>
    );
};

const RelatedLogElements = ({ logElements }) => {
    return (
        <div
            className="container"
            style={{ marginTop: "25px" }}>
            <ChromeTitle title="Relaterte loggelementer" />
            <ul
                className="pp-simpleList"
                style={{ width: "300px" }}>
                {logElements.map(e => <LogElement data={e} />)}
            </ul>
        </div>
    );
};

export default RelatedLogElements;
