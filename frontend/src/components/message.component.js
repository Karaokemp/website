"use strict";
exports.__esModule = true;
var mobx_react_1 = require("mobx-react");
var react_1 = require("react");
var types_1 = require("../types");
function getThemeBootstrapClasses(theme) {
    switch (theme) {
        case types_1.MessageTheme.ERROR:
            return "alert alert-danger alert-dismissible fade show";
        case types_1.MessageTheme.SUCCESS:
            return "alert alert-success";
        case types_1.MessageTheme.NOTHING:
            return '';
    }
}
var MessageComponent = mobx_react_1.observer(function (props) {
    return (<div className={getThemeBootstrapClasses(props.message.theme)}>{props.message.text}</div>);
});
exports["default"] = MessageComponent;
