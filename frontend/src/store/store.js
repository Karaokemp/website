"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Context = exports.Store = void 0;
var mobx_1 = require("mobx");
var react_1 = require("react");
var types_1 = require("../types");
var Store = /** @class */ (function () {
    function Store() {
        this.songSuggestions = new Array();
        this.requests = new Array();
        this.readySongs = new Array();
        this.selectedVideoId = 'FxyQTb6n4_I';
        this.message = { text: 'Here is some text!', theme: types_1.MessageTheme.SUCCESS };
        this.secondaryComponent = types_1.SecondaryComponentMode.BACKEND_STATE;
    }
    Store.prototype.selectSong = function (videoId) {
        this.selectedVideoId = videoId;
    };
    Store.prototype.toggleTheme = function () {
        this.message.theme = this.message.theme == types_1.MessageTheme.ERROR ? types_1.MessageTheme.SUCCESS : types_1.MessageTheme.ERROR;
    };
    Object.defineProperty(Store.prototype, "messageThemeBootstrapClasses", {
        get: function () {
            switch (this.message.theme) {
                case types_1.MessageTheme.ERROR:
                    return "alert alert-danger alert-dismissible fade show";
                case types_1.MessageTheme.SUCCESS:
                    return "alert alert-success";
            }
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], Store.prototype, "songSuggestions");
    __decorate([
        mobx_1.observable
    ], Store.prototype, "requests");
    __decorate([
        mobx_1.observable
    ], Store.prototype, "readySongs");
    __decorate([
        mobx_1.observable
    ], Store.prototype, "selectedVideoId");
    __decorate([
        mobx_1.observable
    ], Store.prototype, "message");
    __decorate([
        mobx_1.observable
    ], Store.prototype, "secondaryComponent");
    __decorate([
        mobx_1.action
    ], Store.prototype, "selectSong");
    __decorate([
        mobx_1.action
    ], Store.prototype, "toggleTheme");
    __decorate([
        mobx_1.computed
    ], Store.prototype, "messageThemeBootstrapClasses");
    return Store;
}());
exports.Store = Store;
exports.Context = react_1["default"].createContext(new Store());
