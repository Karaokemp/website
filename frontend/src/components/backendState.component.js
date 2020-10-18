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
var downloading_component_1 = require("../components/downloading.component");
var KARAOKEMP_BACKEND = process.env.REACT_APP_KARAOKEMP_BACKEND || 'http://localhost:4000';
var FETCHING_INTERVAL = Number(process.env.REACT_APP_FETCHING_INTERVAL) || 1000;
console.log(FETCHING_INTERVAL);
var BackendStateComponent = /** @class */ (function (_super) {
    __extends(BackendStateComponent, _super);
    function BackendStateComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            backendState: null,
            fetchingTimeout: null
        };
        return _this;
    }
    BackendStateComponent.prototype.componentDidMount = function () {
        this.updateBackendState();
        var timeout = setInterval(this.updateBackendState.bind(this), FETCHING_INTERVAL);
    };
    BackendStateComponent.prototype.updateBackendState = function () {
        var _this = this;
        console.log(KARAOKEMP_BACKEND);
        fetch(KARAOKEMP_BACKEND + "/state")
            .then(function (res) { return res.json(); })
            .then(function (newBackendState) {
            _this.setState({ backendState: newBackendState });
        })["catch"](console.error);
    };
    BackendStateComponent.prototype.render = function () {
        if (!this.state.backendState) {
            return (<div><p>Waiting for connection to Karaokemp servers...</p></div>);
        }
        return (<div>
        <h4>Requests</h4>
        <hr />
        <ol>
      {this.state.backendState.requests.map(function (link, index) { return <li key={index}>{link}</li>; })}
          </ol>
          <downloading_component_1["default"] link={this.state.backendState.downloading}/>
          <h4>Ready Songs</h4>
        <hr />
        <ol>
        {this.state.backendState.readySongs.list.map(function (song, index) { return <li key={index}>{song.cloudUrl}</li>; })}
          </ol>
      </div>);
    };
    return BackendStateComponent;
}(react_1.Component));
exports["default"] = BackendStateComponent;
