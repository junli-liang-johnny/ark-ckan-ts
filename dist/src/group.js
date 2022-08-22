"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CKANGroupService = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var base_1 = require("./base");
var getListParamArray = ['all_fields', 'groups', 'include_dataset_count', 'include_extras', 'include_groups', 'include_tags', 'include_users', 'limit', 'offset', 'order_by', 'sort'];
var CKANGroupService = /** @class */ (function () {
    function CKANGroupService() {
    }
    CKANGroupService.get = function (data) {
        return new Promise(function (resolve, reject) {
            var url;
            if (Object.keys(data).every(function (el) { return getListParamArray.includes(el); }))
                url = "".concat(base_1.CKANAPIBase.BASE_CKAN_API_URL, "/group_list?").concat(new URLSearchParams(data).toString());
            else
                url = "".concat(base_1.CKANAPIBase.BASE_CKAN_API_URL, "/group_show?").concat(new URLSearchParams(data).toString());
            (0, node_fetch_1.default)(url)
                .then(function (res) { return res.json(); })
                .then(function (res) {
                resolve(res);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    CKANGroupService.create = function () {
    };
    CKANGroupService.remove = function () {
    };
    CKANGroupService.update = function () {
    };
    return CKANGroupService;
}());
exports.CKANGroupService = CKANGroupService;
//# sourceMappingURL=group.js.map