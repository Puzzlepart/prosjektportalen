import * as React from "react";
import IProjectListProps from "./IProjectListProps";

const Style = ({ props }: { props: IProjectListProps }) => {
    return <style type="text/css">{`
                .${props.tileClassName} {
                    width: ${props.tileWidth}px;
                    margin-bottom: ${props.masonryOptions.gutter}px;
                }
                .${props.tileClassName} .ms-DocumentCardLocation {
                    background-color: none;
                    color: rgb(51, 51, 51);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    text-align: center;
                    border-top: 1px solid #dedede;
                    border-bottom: 1px solid #dedede;
                }
                .${props.tileClassName}:hover .ms-DocumentCardLocation {
                    -webkit-transition: opacity .35s ease-in-out;
                    transition: opacity .35s ease-in-out;
                    text-decoration: none;
                }
                .${props.tileClassName} .ms-DocumentCardPreview img {
                    max-width: 100%;
                    max-height: 100%;
                }
            `}
    </style>;
};

export default Style;
