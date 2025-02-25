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
exports.CKANPackageService = void 0;
var base_1 = require("./base");
var CKANPackageService = /** @class */ (function (_super) {
    __extends(CKANPackageService, _super);
    function CKANPackageService(props) {
        var _this = _super.call(this, props) || this;
        _this.isDcatDatasetURL = function (id) {
            if (!id)
                return false;
            return id.includes("dataset") && !id.includes("resource");
        };
        _this.get = function (action, data, headers) {
            return new Promise(function (resolve, reject) {
                console.log("ckan package - get - data: ", data, ", headers: ", headers);
                var url = _this.createGetURL(action, data);
                fetch(url, {
                    headers: {
                        Authorization: (headers === null || headers === void 0 ? void 0 : headers.Authorization) || _this.API_KEY,
                    },
                })
                    .then(function (res) { return res.json(); })
                    .then(function (res) {
                    return resolve(res);
                })
                    .catch(function (err) {
                    console.error("ckan - package - get - err: ", err);
                    reject(err);
                });
            });
        };
        _this.createGetURL = function (action, data) {
            var url;
            if (action === "search")
                url = "".concat(_this.BASE_CKAN_API_URL, "/package_search?").concat(new URLSearchParams(data).toString());
            else if (action === "show")
                url = "".concat(_this.BASE_CKAN_API_URL, "/package_show?").concat(new URLSearchParams(data).toString());
            else if (action === "autocomplete")
                url = "".concat(_this.BASE_CKAN_API_URL, "/package_autocomplete?").concat(new URLSearchParams(data).toString());
            else
                url = "".concat(_this.BASE_CKAN_API_URL, "/package_list?").concat(new URLSearchParams(data).toString());
            return url;
        };
        return _this;
    }
    CKANPackageService.prototype.dcatDatasetURL = function (id) {
        return "".concat(this.BASE_CKAN_URL, "/dataset/").concat(id);
    };
    CKANPackageService.prototype.create = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = "".concat(_this.BASE_CKAN_API_URL, "/package_create");
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
                return resolve(res);
            })
                .catch(function (err) {
                console.error("ckan - package - create - err: ", err);
                reject(err);
            });
        });
    };
    CKANPackageService.prototype.update = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = "".concat(_this.BASE_CKAN_API_URL, "/package_update");
            fetch(url, {
                method: "POST",
                headers: {
                    Authorization: _this.API_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                console.error("ckan - package - create - err: ", err);
                reject(err);
            });
        });
    };
    return CKANPackageService;
}(base_1.CKANAPIBase));
exports.CKANPackageService = CKANPackageService;
//# sourceMappingURL=package.js.map