import * as React from "react";

const MatrixHeaderCell = ({ label, className }) => {
    return (
        <div className={className}>
            <span>{label}</span>
        </div>
    );
};

export default MatrixHeaderCell;

