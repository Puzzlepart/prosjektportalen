import * as React from "react";
import { ModalLink } from "../../../@Components";

export interface IRiskElementProps {
    item: any;
    style?: React.CSSProperties;
}

const RiskElement = ({ item: { ID, Title }, style }: IRiskElementProps) => {
    let dispFormUrl = `../${__("DefaultView_Uncertainties_Url").replace("AllItems", "DispForm")}?ID=${ID}`;
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
