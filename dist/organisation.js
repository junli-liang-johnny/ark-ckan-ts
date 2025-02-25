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
exports.CKANOrganisationService = void 0;
var base_1 = require("./base");
var CKANOrganisationService = /** @class */ (function (_super) {
    __extends(CKANOrganisationService, _super);
    function CKANOrganisationService(props) {
        return _super.call(this, props) || this;
    }
    CKANOrganisationService.prototype.get = function (type, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url;
            if (type === "list")
                url = "".concat(_this.BASE_CKAN_API_URL, "/organization_list?").concat(new URLSearchParams(data).toString());
            else
                url = "".concat(_this.BASE_CKAN_API_URL, "/organization_show?").concat(new URLSearchParams(data).toString());
            fetch(url)
                .then(function (res) { return res.json(); })
                .then(function (res) {
                resolve(res);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    CKANOrganisationService.prototype.create = function (type, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url;
            var formData = new FormData();
            Object.entries(data).forEach(function (_a) {
                var key = _a[0], val = _a[1];
                return formData.append(key, val);
            });
            if (type === "member_create")
                url = "".concat(_this.BASE_CKAN_API_URL, "/organization_member_create");
            else
                url = "".concat(_this.BASE_CKAN_API_URL, "/organization_member_create");
            fetch(url, {
                method: "POST",
                headers: { Authorization: _this.API_KEY },
                body: formData,
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                if (type === "member_create")
                    return resolve(res);
                resolve(res);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    return CKANOrganisationService;
}(base_1.CKANAPIBase));
exports.CKANOrganisationService = CKANOrganisationService;
//# sourceMappingURL=organisation.js.map