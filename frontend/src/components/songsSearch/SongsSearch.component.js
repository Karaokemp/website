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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var react_1 = require("react");
var mobx_react_1 = require("mobx-react");
var types_1 = require("../../types");
require("./SongsSearch.css");
var logo_png_1 = require("../../pics/logo.png");
var youtube_logo_svg_1 = require("../../pics/youtube-logo.svg");
var react_player_1 = require("react-player");
var secondary_component_1 = require("../secondary.component");
var validMark_component_1 = require("../validMark.component");
var store_1 = require("../../store/store");
var message_component_1 = require("../message.component");
var DEFAULT_VIDEO_ID = 'FxyQTb6n4_I';
var KARAOKEMP_BACKEND = process.env.REACT_APP_KARAOKEMP_BACKEND || 'http://localhost:4000';
var SongsSearchComponent = /** @class */ (function (_super) {
    __extends(SongsSearchComponent, _super);
    function SongsSearchComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            term: '',
            message: { text: '', theme: types_1.MessageTheme.NOTHING },
            selectedVideoID: DEFAULT_VIDEO_ID,
            suggestions: null,
            secondaryComponent: types_1.SecondaryComponentMode.NOTHING
        };
        return _this;
    }
    SongsSearchComponent.prototype.handleInputChange = function (change) {
        var _this = this;
        var value = change.target.value;
        this.context.toggleTheme();
        if (types_1.isYoutubePath(value)) {
            var link = new types_1.YoutubeURL(value);
            var videoId = link.searchParams.get('v') || this.state.selectedVideoID;
            this.setState({ selectedVideoID: videoId });
            this.setState({ message: { text: "Found Youtube Link!", theme: types_1.MessageTheme.SUCCESS } });
        }
        else {
            this.setState({ message: { text: '', theme: types_1.MessageTheme.NOTHING } });
            fetch(KARAOKEMP_BACKEND + "/songs?term=" + value)
                .then(function (res) { return res.json(); })
                .then(function (newSuggestions) {
                _this.setState({ suggestions: newSuggestions });
            })["catch"](console.error);
        }
    };
    SongsSearchComponent.prototype.handleRequest = function () {
        if (this.state.selectedVideoID.length) {
            this.sendRequest();
        }
        else {
            this.setState({ message: { text: "Could not send request!", theme: types_1.MessageTheme.ERROR } });
        }
    };
    SongsSearchComponent.prototype.sendRequest = function () {
        var _this = this;
        var requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoId: this.state.selectedVideoID })
        };
        fetch('http://localhost:4000/link', requestOptions)
            .then(function (response) { return response.json(); })
            .then(function (newBackendState) {
            _this.setState({ secondaryComponent: types_1.SecondaryComponentMode.BACKEND_STATE });
        })["catch"](console.error);
        this.setState({ message: { text: '', theme: types_1.MessageTheme.NOTHING } });
    };
    SongsSearchComponent.prototype.render = function () {
        return (<div className="container">
  <div className="row">
    <div className="col-6 col-lg-6">
      <h1>Welcome to The Karaokemp!</h1>
      <div className="text-center"><img className='big' src={logo_png_1["default"]} alt='' style={{ height: '100px' }}/></div> <br /><hr />
        
        <div className='instructions'>Steal Video from &nbsp;<img src={youtube_logo_svg_1["default"]} alt=''/>
        <input type="text" onChange={this.handleInputChange.bind(this)} style={{ width: "80%" }} placeholder='title, artist, link'/>
        <validMark_component_1["default"] valid={!this.state.message && this.state.term.length > 0}/>

       <message_component_1["default"] message={this.state.message}/>
        </div>
        <react_player_1["default"] url={"https://www.youtube.com/watch?v=" + this.state.selectedVideoID + "&vl=en"}/>
                <button className="btn btn-primary" onClick={this.handleRequest.bind(this)}>Request song!</button>

        <hr />

    </div>
    <div className="col-6 col-lg-6">
      <secondary_component_1["default"] mode={this.state.secondaryComponent}/>
      </div>
  </div>
        </div>);
    };
    SongsSearchComponent.contextType = store_1.Context;
    SongsSearchComponent = __decorate([
        mobx_react_1.observer
    ], SongsSearchComponent);
    return SongsSearchComponent;
}(react_1.Component));
exports["default"] = SongsSearchComponent;
