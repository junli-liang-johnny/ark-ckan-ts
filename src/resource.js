"use strict";
exports.__esModule = true;
exports.CKANResourceService = void 0;
var node_fetch_1 = require("node-fetch");
var form_data_1 = require("form-data");
var _1 = require(".");
var CKANResourceService = /** @class */ (function () {
    function CKANResourceService() {
    }
    CKANResourceService.dcatDistributionURL = function (datasetId, resourceId) {
        return "".concat(_1.CKANAPIBase.BASE_CKAN_URL, "/dataset/").concat(datasetId, "/resource/").concat(resourceId);
    };
    CKANResourceService.get = function (action, data, headers) {
        return new Promise(function (resolve, reject) {
            var url;
            if (action === 'search')
                url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/resource_search?").concat(new URLSearchParams(data).toString());
            else if (action === 'show')
                url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/resource_show?").concat(new URLSearchParams(data).toString());
            else
                url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/resource_show?").concat(new URLSearchParams(data).toString());
            (0, node_fetch_1["default"])(url, { 'headers': { 'Authorization': (headers === null || headers === void 0 ? void 0 : headers.Authorization) || _1.CKANAPIBase.API_KEY } })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                return resolve(res);
            })["catch"](function (err) {
                console.error('ckan - resource - get - err: ', err);
                reject(err);
            });
        });
    };
    // upload not working on nodejs
    CKANResourceService.create = function (data) {
        return new Promise(function (resolve, reject) {
            var url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/resource_create");
            // const formData = new FormData();
            var formData = new form_data_1["default"]();
            Object.entries(data).forEach(function (_a) {
                var key = _a[0], val = _a[1];
                return formData.append(key, val);
            });
            (0, node_fetch_1["default"])(url, {
                'method': 'POST',
                'headers': {
                    'Authorization': _1.CKANAPIBase.API_KEY
                },
                'body': formData
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                console.log('ckan - resource - create - res: ', res);
                return resolve(res);
            })["catch"](function (err) {
                console.error('ckan - resource - create - err: ', err);
                reject(err);
            });
        });
    };
    CKANResourceService.remove = function () {
    };
    CKANResourceService.update = function (data) {
        return new Promise(function (resolve, reject) {
            var url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/resource_update");
            var formData = new FormData();
            // const formData = new NodeFormData();
            Object.entries(data).forEach(function (_a) {
                var key = _a[0], val = _a[1];
                return formData.append(key, val);
            });
            fetch(url, {
                'method': 'POST',
                'headers': {
                    'Authorization': _1.CKANAPIBase.API_KEY
                },
                'body': formData
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                console.log('ckan - resource - create - res: ', res);
                return resolve(res);
            })["catch"](function (err) {
                console.error('ckan - resource - create - err: ', err);
                reject(err);
            });
        });
    };
    CKANResourceService.isDcatDistributionURL = function (id) {
        if (!id)
            return false;
        return id.includes('resource') && id.includes('dataset');
    };
    CKANResourceService.extractPackageId = function (id) {
        var split = id.split('/');
        var packageIndex = split.indexOf('dataset');
        return split[packageIndex + 1];
    };
    return CKANResourceService;
}());
exports.CKANResourceService = CKANResourceService;
