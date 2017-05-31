import * as React from "react";
import IProjectListProps from "./IProjectListProps";

const Style = ({ props }: { props: IProjectListProps }) => {
    return <style type="text/css">{`
                .${props.tileClassName} {
                    width: ${props.tileWidth}px;
                    margin-bottom: ${props.masonryOptions.gutter}px;
                }
                .${props.tileClassName} .ms-DocumentCardLocation {
                    background-color: rgb(51, 51, 51);
                    color: #fff;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    text-align: center;
                    opacity: 0.5;
                }
                .${props.tileClassName}:hover .ms-DocumentCardLocation {
                    opacity: 1.0;
                    -webkit-transition: opacity .35s ease-in-out;
                    transition: opacity .35s ease-in-out;
                    text-decoration: none;
                }
            `}
    </style>;
};

export default Style;
