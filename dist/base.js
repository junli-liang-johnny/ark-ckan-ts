"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CKANAPIBase = exports.CKAN_API_TOKEN_LOCALSTORAGE_KEY = void 0;
exports.CKAN_API_TOKEN_LOCALSTORAGE_KEY = "ckan_api_token_key";
var CKANAPIBase = /** @class */ (function () {
    function CKANAPIBase(props) {
        this.BASE_CKAN_URL = props.ckanURL;
        this.BASE_CKAN_API_URL = props.ckanAPIURL;
        this.API_KEY = props.apiKey;
        this.API_KEY_ID = props.apiKeyID;
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