import * as React from "react";

const MatrixHeaderCell = ({ label }) => {
    return (
        <td
            className="headers">
            <span>{label}</span>
        </td>
    );
};

export default MatrixHeaderCell;

