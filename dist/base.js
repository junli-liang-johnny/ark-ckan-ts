"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CKANAPIBase = exports.CKAN_API_TOKEN_LOCALSTORAGE_KEY = void 0;
exports.CKAN_API_TOKEN_LOCALSTORAGE_KEY = "ckan_api_token_key";
var CKANAPIBase = /** @class */ (function () {
    function CKANAPIBase(props) {
        this.BASE_CKAN_URL = props.ckan_url;
        this.BASE_CKAN_API_URL = props.ckan_api_url;
        this.API_KEY = props.api_key;
        this.API_KEY_ID = props.api_key_id;
    }
    CKANAPIBase.extreactIdFromURL = function (url) {
        try {
            var split = url.split("/");
            return split[split.length - 1];
        }
        catch (err) {
            console.error("extractIdFromURL - err: ", err);
        }
    };
    return CKANAPIBase;
}());
exports.CKANAPIBase = CKANAPIBase;
//# sourceMappingURL=base.js.map