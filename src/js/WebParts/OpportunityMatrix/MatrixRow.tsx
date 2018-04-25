import * as React from "react";

const MatrixRow = ({ cells }) => {
    return (
        <tr className="opportunity-matrix-row">
            {cells}
        </tr>
    );
};

export default MatrixRow;

