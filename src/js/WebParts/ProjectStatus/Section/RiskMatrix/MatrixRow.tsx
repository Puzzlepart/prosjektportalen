import * as React from "react";

const MatrixRow = ({ cells }) => {
    return (
        <tr
            className="risk-matrix-row">
            {cells}
        </tr>
    );
};

export default MatrixRow;

