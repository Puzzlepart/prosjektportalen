import * as React from "react";
import * as Util from "../../Util";
import { ChromeTitle, ModalLink } from "../../WebParts/@Components";

const FollowupElement = ({ data: { ID, GtMeasurementDate: Date, GtMeasurementComment: Comment, GtMeasurementValue: Value } }) => {
    let dispFormUrl = `../../${__("DefaultView_GainsFollowup_Url")}?ID=${ID}`.replace("AllItems", "DispForm");
    return (<li>
        <h3><ModalLink label={Util.dateFormat(Date, "LL")} url={dispFormUrl} options={{ HideRibbon: true }} /></h3>
        <p className="ms-metadata"><b>{__("SiteFields_GtMeasurementValue_DisplayName")}:</b> {Value}</p>
        <p className="ms-metadata" hidden={!Comment}><b>{__("String_Comment")}:</b> {Comment}</p>
    </li>);
};

export const RelatedFollowups = ({ followups }) => {
    return (<div>
        <ChromeTitle title={__("Lists_GainsFollowup_Title")} />
        <ul className="pp-simpleList" style={{ width: "300px" }}>
            {followups.map((e, idx) => <FollowupElement key={idx} data={e} />)}
        </ul>
    </div>);
};
