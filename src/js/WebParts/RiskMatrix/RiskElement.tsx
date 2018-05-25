import * as React from "react";
import { ModalLink } from "../@Components";
import RiskElementModel from "./RiskElementModel";

export interface IRiskElementProps {
    model: RiskElementModel;
    style?: React.CSSProperties;
}

const RiskElement = (props: IRiskElementProps) => {
    return (
        <div
            className="risk-matrix-element"
            title={props.model.title}
            style={props.style}>
            <ModalLink
                label={props.model.id}
                url={props.model.url}
                options={{ HideRibbon: true }} />
        </div>
    );
};

export default RiskElement;
