"use strict";
exports.__esModule = true;
var react_1 = require("react");
var DownloadingComponent = function (props) {
    if (props.link) {
        return (<div className="alert alert-info" role="alert">
        <h5>Downloading:</h5>
        <p> {props.link}</p>
    </div>);
    }
    else {
        return (<div></div>);
    }
};
exports["default"] = DownloadingComponent;
