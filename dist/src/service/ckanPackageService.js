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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ckanService_1 = __importDefault(require("./ckanService"));
var CKANPackageService = /** @class */ (function (_super) {
    __extends(CKANPackageService, _super);
    function CKANPackageService(url, auth) {
        return _super.call(this, url, auth) || this;
    }
    // show() {}
    CKANPackageService.prototype.list = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _data = Object.entries(data || {}).reduce(function (acc, _a) {
                var _b;
                var key = _a[0], value = _a[1];
                return __assign(__assign({}, acc), (_b = {}, _b[key] = String(value), _b));
            }, {});
            var _url = "".concat(_this.url, "/package_list?").concat(new URLSearchParams(_data).toString());
            fetch(_url, {
                method: "GET",
                headers: _this._headers,
            })
                .then(function (res) {
                if (res.ok)
                    return res.json();
                else {
                    console.error("Failed to fetch, res: ", res.statusText);
                    // return reject(res.statusText);
                    return res.json();
                }
            })
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                console.error("ckan - package - list - err: ", err);
                reject(err);
            });
        });
    };
    return CKANPackageService;
}(ckanService_1.default));
exports.default = CKANPackageService;
//# sourceMappingURL=ckanPackageService.js.map