import * as React from "react";

const MatrixCell = ({ className, contents }) => {
    return (
        <td className={className}>
            <div className="cell-container">
                {contents}
            </div>
        </td>
    );
};

export default MatrixCell;
