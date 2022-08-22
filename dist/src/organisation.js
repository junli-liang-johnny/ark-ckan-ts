"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CKANAPIOrganisationService = void 0;
var base_1 = require("./base");
var CKANAPIOrganisationService = /** @class */ (function () {
    function CKANAPIOrganisationService() {
    }
    CKANAPIOrganisationService.get = function (type, data) {
        return new Promise(function (resolve, reject) {
            var url;
            if (type === 'list')
                url = "".concat(base_1.CKANAPIBase.BASE_CKAN_API_URL, "/organization_list?").concat(new URLSearchParams(data).toString());
            else
                url = "".concat(base_1.CKANAPIBase.BASE_CKAN_API_URL, "/organization_show?").concat(new URLSearchParams(data).toString());
            fetch(url)
                .then(function (res) { return res.json(); })
                .then(function (res) {
                resolve(res);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    CKANAPIOrganisationService.create = function (type, data) {
        return new Promise(function (resolve, reject) {
            // console.debug('ckan organisation - data: ', data);
            var url;
            var formData = new FormData();
            Object.entries(data).forEach(function (_a) {
                var key = _a[0], val = _a[1];
                return formData.append(key, val);
            });
            if (type === 'member_create')
                url = "".concat(base_1.CKANAPIBase.BASE_CKAN_API_URL, "/organization_member_create");
            else
                url = "".concat(base_1.CKANAPIBase.BASE_CKAN_API_URL, "/organization_member_create");
            fetch(url, { 'method': 'POST', 'headers': { 'Authorization': base_1.CKANAPIBase.API_KEY }, 'body': formData })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                // console.debug('ckan organisation - res: ', res);
                if (type === 'member_create')
                    return resolve(res);
                resolve(res);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    CKANAPIOrganisationService.remove = function () {
    };
    CKANAPIOrganisationService.update = function () {
    };
    return CKANAPIOrganisationService;
}());
exports.CKANAPIOrganisationService = CKANAPIOrganisationService;
//# sourceMappingURL=organisation.js.map