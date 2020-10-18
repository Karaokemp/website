"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ValidMarkComponent = function (props) {
    if (props.valid) {
        return (<span style={{ fontSize: '30px' }}>&#10004;</span>);
    }
    else {
        return (<div></div>);
    }
};
exports["default"] = ValidMarkComponent;
