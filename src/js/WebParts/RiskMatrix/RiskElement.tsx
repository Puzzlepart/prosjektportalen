import * as React from "react";
import RESOURCE_MANAGER from "../../@localization";
import { ModalLink } from "../@Components";

export interface IRiskElementProps {
    item: any;
    style?: React.CSSProperties;
}

const RiskElement = ({ item: { ID, Title }, style }: IRiskElementProps) => {
    let dispFormUrl = `${_spPageContextInfo.webAbsoluteUrl}/${RESOURCE_MANAGER.getResource("DefaultView_Uncertainties_Url").replace("AllItems", "DispForm")}?ID=${ID}`;
    return (
        <div
            className={`risk-matrix-element`}
            title={Title}
            style={style}>
            <ModalLink
                label={ID}
                url={dispFormUrl}
                options={{ HideRibbon: true }} />
        </div>
    );
};

export default RiskElement;
