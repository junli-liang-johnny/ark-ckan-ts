"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CKANUserService = void 0;
var _1 = require(".");
var CKANUserService = /** @class */ (function () {
    function CKANUserService() {
    }
    CKANUserService.get = function (type, data) {
        return new Promise(function (resolve, reject) {
            var url;
            if (type === "api_token_list")
                url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/api_token_list?").concat(new URLSearchParams(data).toString());
            else if (type === "show")
                url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/user_show?").concat(new URLSearchParams(data).toString());
            else
                url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/user_list?").concat(new URLSearchParams(data).toString());
            fetch(url, { headers: { Authorization: _1.CKANAPIBase.API_KEY } })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                // console.log('res: ', res);
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
    CKANUserService.create = function (type, data) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            // const formData = new NodeFormData();
            Object.entries(data).forEach(function (_a) {
                var key = _a[0], val = _a[1];
                return formData.append(key, val);
            });
            var url;
            if (type === "user_create")
                url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/user_create");
            else
                url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/api_token_create?").concat(new URLSearchParams(data).toString());
            fetch(url, {
                method: "POST",
                headers: {
                    Authorization: _1.CKANAPIBase.API_KEY,
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
    CKANUserService.remove = function (type, data) {
        return new Promise(function (resolve, reject) {
            var url;
            var formData = new FormData();
            // const formData = new NodeFormData();
            if (type === "user_remove") {
                url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/user_delete?").concat(new URLSearchParams(data).toString());
                formData.append("id", data.id);
            }
            else {
                url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/api_token_revoke");
                Object.entries(data).forEach(function (_a) {
                    var key = _a[0], val = _a[1];
                    return formData.append(key, val);
                });
            }
            fetch(url, {
                method: "POST",
                headers: {
                    Authorization: _1.CKANAPIBase.API_KEY,
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
    CKANUserService.update = function (data) {
        return new Promise(function (resolve, reject) {
            var url = "".concat(_1.CKANAPIBase.BASE_CKAN_API_URL, "/user_update");
            var formData = new FormData();
            // const formData = new NodeFormData();
            Object.entries(data).forEach(function (_a) {
                var key = _a[0], val = _a[1];
                return formData.append(key, val);
            });
            fetch(url, {
                method: "POST",
                headers: {
                    Authorization: _1.CKANAPIBase.API_KEY,
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
}());
exports.CKANUserService = CKANUserService;
//# sourceMappingURL=user.js.map