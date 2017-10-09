import * as React from "react";

const MatrixRow = ({ cells }) => {
    return (
        <div className="risk-matrix-row ms-Grid-row">
            {cells}
        </div>
    );
};

export default MatrixRow;

