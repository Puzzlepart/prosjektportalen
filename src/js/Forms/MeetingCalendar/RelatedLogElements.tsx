import * as React from "react";
import RESOURCE_MANAGER from "localization";
import { ChromeTitle, ModalLink } from "../../WebParts/@Components";

const LogElement = ({ data }) => {
    let dispFormUrl = `${_spPageContextInfo.webAbsoluteUrl}/${RESOURCE_MANAGER.getResource("DefaultView_ProjectLog_Url")}?ID=${data.ID}`.replace("AllItems", "DispForm");
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
            <ChromeTitle title={RESOURCE_MANAGER.getResource("WebPart_RelatedLogElements_Title")} />
            <ul
                className="pp-simpleList"
                style={{ width: "300px" }}>
                {logElements.map(e => <LogElement data={e} />)}
            </ul>
        </div>
    );
};

export default RelatedLogElements;
