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
exports.CKANGroupService = void 0;
var base_1 = require("./base");
var getListParamArray = [
    "all_fields",
    "groups",
    "include_dataset_count",
    "include_extras",
    "include_groups",
    "include_tags",
    "include_users",
    "limit",
    "offset",
    "order_by",
    "sort",
];
var CKANGroupService = /** @class */ (function (_super) {
    __extends(CKANGroupService, _super);
    function CKANGroupService(props) {
        return _super.call(this, props) || this;
    }
    CKANGroupService.prototype.get = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url;
            if (Object.keys(data).every(function (el) {
                return getListParamArray.includes(el);
            }))
                url = "".concat(_this.BASE_CKAN_API_URL, "/group_list?").concat(new URLSearchParams(data).toString());
            else
                url = "".concat(_this.BASE_CKAN_API_URL, "/group_show?").concat(new URLSearchParams(data).toString());
            fetch(url)
                .then(function (res) { return res.json(); })
                .then(function (res) {
                resolve(res);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    return CKANGroupService;
}(base_1.CKANAPIBase));
exports.CKANGroupService = CKANGroupService;
//# sourceMappingURL=group.js.map