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
exports.CKANResourceService = void 0;
var base_1 = require("./base");
var CKANResourceService = /** @class */ (function (_super) {
    __extends(CKANResourceService, _super);
    function CKANResourceService(props) {
        return _super.call(this, props) || this;
    }
    CKANResourceService.prototype.dcatDistributionURL = function (datasetId, resourceId) {
        return "".concat(this.BASE_CKAN_URL, "/dataset/").concat(datasetId, "/resource/").concat(resourceId);
    };
    CKANResourceService.prototype.get = function (action, data, headers) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url;
            if (action === "search")
                url = "".concat(_this.BASE_CKAN_API_URL, "/resource_search?").concat(new URLSearchParams(data).toString());
            else if (action === "show")
                url = "".concat(_this.BASE_CKAN_API_URL, "/resource_show?").concat(new URLSearchParams(data).toString());
            else
                url = "".concat(_this.BASE_CKAN_API_URL, "/resource_show?").concat(new URLSearchParams(data).toString());
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
                console.error("ckan - resource - get - err: ", err);
                reject(err);
            });
        });
    };
    // upload not working on nodejs
    CKANResourceService.prototype.create = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = "".concat(_this.BASE_CKAN_API_URL, "/resource_create");
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
                console.log("ckan - resource - create - res: ", res);
                return resolve(res);
            })
                .catch(function (err) {
                console.error("ckan - resource - create - err: ", err);
                reject(err);
            });
        });
    };
    CKANResourceService.prototype.update = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = "".concat(_this.BASE_CKAN_API_URL, "/resource_update");
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
                console.log("ckan - resource - create - res: ", res);
                return resolve(res);
            })
                .catch(function (err) {
                console.error("ckan - resource - create - err: ", err);
                reject(err);
            });
        });
    };
    CKANResourceService.isDcatDistributionURL = function (id) {
        if (!id)
            return false;
        return id.includes("resource") && id.includes("dataset");
    };
    CKANResourceService.extractPackageId = function (id) {
        var split = id.split("/");
        var packageIndex = split.indexOf("dataset");
        return split[packageIndex + 1];
    };
    return CKANResourceService;
}(base_1.CKANAPIBase));
exports.CKANResourceService = CKANResourceService;
//# sourceMappingURL=resource.js.map