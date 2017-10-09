import * as React from "react";

const MatrixHeaderCell = ({ label, className }) => {
    return (
        <td className={className}>
            <span>{label}</span>
        </td>
    );
};

export default MatrixHeaderCell;

