"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var types_1 = require("../types");
var backendState_component_1 = require("./backendState.component");
var songSuggestions_component_1 = require("./songSuggestions.component");
var SecondaryComponent = /** @class */ (function (_super) {
    __extends(SecondaryComponent, _super);
    function SecondaryComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecondaryComponent.prototype.render = function () {
        switch (this.props.mode) {
            case types_1.SecondaryComponentMode.BACKEND_STATE:
                return (<backendState_component_1["default"] />);
            case types_1.SecondaryComponentMode.SONG_SUGGESTIONS:
                return (<songSuggestions_component_1["default"] />);
            case types_1.SecondaryComponentMode.NOTHING:
                return (<div></div>);
        }
    };
    return SecondaryComponent;
}(react_1.Component));
exports["default"] = SecondaryComponent;
