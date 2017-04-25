import * as React from "react";

const ChromeTitle = ({ title }) => {
    return (<div className="ms-webpart-chrome-title">
        <span title={title} className="js-webpart-titleCell">
            <h2 style={{ textAlign: "justify" }} className="ms-webpart-titleText">
                <span>{title}</span><span></span>
            </h2>
        </span>
    </div>);
};

export default ChromeTitle;
