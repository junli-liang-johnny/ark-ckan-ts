"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CKANService = /** @class */ (function () {
    function CKANService(url, auth) {
        this.url = url;
        this.auth = auth;
        this._headers = { Authorization: this.auth };
    }
    CKANService.prototype.show = function (data) {
        return new Promise(function (resolve, reject) { });
    };
    CKANService.prototype.list = function (data) {
        return new Promise(function (resolve, reject) { });
    };
    CKANService.prototype.search = function (data) {
        return new Promise(function (resolve, reject) { });
    };
    CKANService.prototype.update = function (data) {
        return new Promise(function (resolve, reject) { });
    };
    CKANService.prototype.autocomplete = function (data) {
        return new Promise(function (resolve, reject) { });
    };
    CKANService.prototype.create = function (data) {
        return new Promise(function (resolve, reject) { });
    };
    return CKANService;
}());
exports.default = CKANService;
//# sourceMappingURL=ckanService.js.map