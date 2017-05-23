import * as React from "react";

const MatrixCell = ({ className, contents }) => {
    return (
        <td
            className={`risk-matrix-element-container ${className}`}>
            {contents}
        </td>
    );
};

export default MatrixCell;
