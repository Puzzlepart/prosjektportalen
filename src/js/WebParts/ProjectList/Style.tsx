import * as React from "react";

const Style = ({ props }) => {
    return <style type="text/css">{`
                .${props.tileClassName} {
                    width: ${props.tileWidth}px;
                    margin-bottom: ${props.tileGutter}px;
                }
            `}
    </style>;
};

export default Style;
