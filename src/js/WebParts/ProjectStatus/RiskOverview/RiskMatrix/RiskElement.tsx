import * as React from "react";
import { ModalLink } from "../../../@Components";

export interface IRiskElementProps {
    item: any;
    style?: React.CSSProperties;
}

const RiskElement = ({ item: { Id, Title }, style }: IRiskElementProps) => {
    let dispFormUrl = `../${__("DefaultView_Uncertainties_Url").replace("AllItems", "DispForm")}?ID=${Id}`;
    return (
        <div className={`risk-matrix-element`} title={Title} style={style}>
            <ModalLink label={Id} url={dispFormUrl} options={{ HideRibbon: true }} />
        </div>
    );
};

export default RiskElement;
