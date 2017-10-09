import * as React from "react";

const MatrixCell = ({ className, contents }) => {
    return (
        <td className={className}>
            {contents}
        </td>
    );
};

export default MatrixCell;
