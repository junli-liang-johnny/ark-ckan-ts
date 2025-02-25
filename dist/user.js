"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CKANUserService = void 0;
var _1 = require("./");
var CKANUserService = /** @class */ (function (_super) {
    __extends(CKANUserService, _super);
    function CKANUserService(props) {
        return _super.call(this, props) || this;
    }
    CKANUserService.prototype.get = function (type, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url;
            if (type === "api_token_list")
                url = "".concat(_this.BASE_CKAN_API_URL, "/api_token_list?").concat(new URLSearchParams(data).toString());
            else if (type === "show")
                url = "".concat(_this.BASE_CKAN_API_URL, "/user_show?").concat(new URLSearchParams(data).toString());
            else
                url = "".concat(_this.BASE_CKAN_API_URL, "/user_list?").concat(new URLSearchParams(data).toString());
            fetch(url, { headers: { Authorization: _this.API_KEY } })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                if (type === "list")
                    return resolve(res);
                else if (type === "show")
                    return resolve(res);
                else
                    return resolve(res);
            })
                .catch(function (err) {
                console.error("ckan - user - get - err: ", err);
                reject(err);
            });
        });
    };
    CKANUserService.prototype.create = function (type, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            Object.entries(data).forEach(function (_a) {
                var key = _a[0], val = _a[1];
                return formData.append(key, val);
            });
            var url;
            if (type === "user_create")
                url = "".concat(_this.BASE_CKAN_API_URL, "/user_create");
            else
                url = "".concat(_this.BASE_CKAN_API_URL, "/api_token_create?").concat(new URLSearchParams(data).toString());
            fetch(url, {
                method: "POST",
                headers: {
                    Authorization: _this.API_KEY,
                },
                body: formData,
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                if (type === "user_create")
                    resolve(res);
                else
                    resolve(res);
            })
                .catch(function (err) {
                console.error("ckan - user - create - err: ", err);
                reject(err);
            });
        });
    };
    CKANUserService.prototype.remove = function (type, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url;
            var formData = new FormData();
            if (type === "user_remove") {
                url = "".concat(_this.BASE_CKAN_API_URL, "/user_delete?").concat(new URLSearchParams(data).toString());
                formData.append("id", data.id);
            }
            else {
                url = "".concat(_this.BASE_CKAN_API_URL, "/api_token_revoke");
                Object.entries(data).forEach(function (_a) {
                    var key = _a[0], val = _a[1];
                    return formData.append(key, val);
                });
            }
            fetch(url, {
                method: "POST",
                headers: {
                    Authorization: _this.API_KEY,
                },
                body: formData,
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                console.log("ckan - user - remove: ", res);
                resolve(res);
            })
                .catch(function (err) {
                console.error("ckan - user - remove - err: ", err);
                reject(err);
            });
        });
    };
    CKANUserService.prototype.update = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = "".concat(_this.BASE_CKAN_API_URL, "/user_update");
            var formData = new FormData();
            Object.entries(data).forEach(function (_a) {
                var key = _a[0], val = _a[1];
                return formData.append(key, val);
            });
            fetch(url, {
                method: "POST",
                headers: {
                    Authorization: _this.API_KEY,
                },
                body: formData,
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                console.log("ckan - user - update: ", res);
                resolve(res);
            })
                .catch(function (err) {
                console.error("ckan - user - update - err: ", err);
                reject(err);
            });
        });
    };
    return CKANUserService;
}(_1.CKANAPIBase));
exports.CKANUserService = CKANUserService;
//# sourceMappingURL=user.js.map