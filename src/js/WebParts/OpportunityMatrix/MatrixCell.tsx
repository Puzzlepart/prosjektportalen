import * as React from "react";

const MatrixCell = (props) => {
    return (
        <td className={props.className} style={props.style}>
            <div className="cell-container">
                {props.contents}
            </div>
        </td>
    );
};

export default MatrixCell;
