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
var react_player_1 = require("react-player");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        return _super.call(this, props) || this;
    }
    App.prototype.render = function () {
        return (<div className='player-wrapper'>
        <react_player_1["default"] className='react-player fixed-bottom' url='https://karaoke-songs.s3.eu-central-1.amazonaws.com/The+Bad+Touch+-+The+Bloodhound+Gang+_+Karaoke+Version+_+KaraFun-AUjmpbd-U2Q.mp4' width='100%' height='100%' controls={true}/>
    </div>);
    };
    return App;
}(react_1.Component));
exports["default"] = App;
