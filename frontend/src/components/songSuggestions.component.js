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
var SongSuggestionsComponent = /** @class */ (function (_super) {
    __extends(SongSuggestionsComponent, _super);
    function SongSuggestionsComponent(props) {
        return _super.call(this, props) || this;
    }
    SongSuggestionsComponent.prototype.render = function () {
        return (<h4>Suggestions</h4>);
    };
    return SongSuggestionsComponent;
}(react_1.Component));
exports["default"] = SongSuggestionsComponent;
