"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CKANAPIBase = exports.CKAN_API_TOKEN_LOCALSTORAGE_KEY = void 0;
var ckan_config_json_1 = require("../ckan.config.json");
exports.CKAN_API_TOKEN_LOCALSTORAGE_KEY = 'ckan_api_token_key';
var CKANAPIBase = /** @class */ (function () {
    function CKANAPIBase() {
    }
    CKANAPIBase.get = function () {
    };
    CKANAPIBase.create = function () {
    };
    CKANAPIBase.update = function () {
    };
    CKANAPIBase.remove = function () {
    };
    CKANAPIBase.BASE_CKAN_URL = ckan_config_json_1.ckan_url;
    CKANAPIBase.BASE_CKAN_API_URL = ckan_config_json_1.ckan_api_url;
    CKANAPIBase.API_KEY = ckan_config_json_1.api_key;
    CKANAPIBase.API_KEY_ID = ckan_config_json_1.api_key_id;
    CKANAPIBase.extreactIdFromURL = function (url) {
        try {
            var split = url.split('/');
            return split[split.length - 1];
        }
        catch (err) {
            console.error('extractIdFromURL - err: ', err);
        }
    };
    return CKANAPIBase;
}());
exports.CKANAPIBase = CKANAPIBase;
//# sourceMappingURL=base.js.map