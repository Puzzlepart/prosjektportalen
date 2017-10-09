import * as React from "react";

const MatrixCell = ({ className, contents }) => {
    return (
        <div
            className={className}>
            {contents}
        </div>
    );
};

export default MatrixCell;
