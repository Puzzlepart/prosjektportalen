import * as React from "react";

const Style = ({ props }) => {
    return <style type="text/css">{`
                .${props.tileClassName} {
                    width: ${props.tileWidth}px;
                    margin-bottom: ${props.tileGutter}px;
                }
                .${props.modalContainerClassName} {
                    margin-left: 25%;
                    margin-right: 25%;
                }
            `}
    </style>;
};

export default Style;
