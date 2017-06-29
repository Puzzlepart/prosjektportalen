import * as React from "react";
import { ChromeTitle, ModalLink } from "../../WebParts/@Components";

const LogElement = ({ data: { ID, Title, GtProjectLogDescription } }) => {
    let dispFormUrl = `../Prosjektlogg/DispForm.aspx?ID=${ID}`;
    return (<li>
        <h3><ModalLink label={Title} url={dispFormUrl} options={{ HideRibbon: true }} /></h3>
        <p className="ms-metadata">{GtProjectLogDescription}</p>
    </li>);
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
