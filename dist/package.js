"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CKANPackageService = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var form_data_1 = __importDefault(require("form-data"));
var _1 = require(".");
var CKANPackageService = /** @class */ (function () {
    function CKANPackageService() {
    }
    CKANPackageService.dcatDatasetURL = function (id) {
        return "".concat(_1.CKANAPIBase.BASE_CKAN_URL, "/dataset/").concat(id);
    };
    CKANPackageService.create = function (data) {
        return new Promise(function (resolve, reject) {
            var url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/package_create");
            // const formData = new FormData();
            var formData = new form_data_1.default();
            Object.entries(data).forEach(function (_a) {
                var key = _a[0], val = _a[1];
                return formData.append(key, val);
            });
            (0, node_fetch_1.default)(url, {
                'method': 'POST',
                'headers': {
                    'Authorization': _1.CKANAPIBase.API_KEY,
                    // 'Content-Type': 'application/json'
                },
                'body': formData
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                console.error('ckan - package - create - err: ', err);
                reject(err);
            });
        });
    };
    CKANPackageService.remove = function () {
    };
    CKANPackageService.update = function (data) {
        return new Promise(function (resolve, reject) {
            var url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/package_update");
            fetch(url, {
                'method': 'POST',
                'headers': {
                    'Authorization': _1.CKANAPIBase.API_KEY,
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify(data)
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                console.error('ckan - package - create - err: ', err);
                reject(err);
            });
        });
    };
    CKANPackageService.isDcatDatasetURL = function (id) {
        if (!id)
            return false;
        return id.includes('dataset') && !id.includes('resource');
    };
    CKANPackageService.get = function (action, data, headers) {
        return new Promise(function (resolve, reject) {
            console.log('ckan package - get - data: ', data, ', headers: ', headers);
            var url = createGetURL(action, data);
            (0, node_fetch_1.default)(url, { 'headers': { 'Authorization': (headers === null || headers === void 0 ? void 0 : headers.Authorization) || _1.CKANAPIBase.API_KEY } })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                console.error('ckan - package - get - err: ', err);
                reject(err);
            });
        });
    };
    return CKANPackageService;
}());
exports.CKANPackageService = CKANPackageService;
var createGetURL = function (action, data) {
    var url;
    if (action === 'search')
        url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/package_search?").concat(new URLSearchParams(data).toString());
    else if (action === 'show')
        url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/package_show?").concat(new URLSearchParams(data).toString());
    else if (action === 'autocomplete')
        url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/package_autocomplete?").concat(new URLSearchParams(data).toString());
    else
        url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/package_list?").concat(new URLSearchParams(data).toString());
    return url;
};
//# sourceMappingURL=package.js.map