"use strict";
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var __generator =
	(this && this.__generator) ||
	function (thisArg, body) {
		var _ = {
				label: 0,
				sent: function () {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: [],
			},
			f,
			y,
			t,
			g;
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === "function" &&
				(g[Symbol.iterator] = function () {
					return this;
				}),
			g
		);
		function verb(n) {
			return function (v) {
				return step([n, v]);
			};
		}
		function step(op) {
			if (f) throw new TypeError("Generator is already executing.");
			while (_)
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y["return"]
									: op[0]
									? y["throw"] || ((t = y["return"]) && t.call(y), 0)
									: y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t;
					if (((y = 0), t)) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return { value: op[1], done: false };
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (
								!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0;
								continue;
							}
							if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
			if (op[0] & 5) throw op[1];
			return { value: op[0] ? op[1] : void 0, done: true };
		}
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeUserAPIToken =
	exports.getUserAPITokenList =
	exports.requestAPIToken =
	exports.getUserAPIToken =
	exports.getCKANDatasetAutocomplete =
	exports.searchCKANDatasetSync =
	exports.searchCKANDataset =
	exports.loadCKANDatasetSync =
	exports.loadCKANDataset =
	exports.CKANAPIBase =
	exports.CKAN_API_TOKEN_LOCALSTORAGE_KEY =
		void 0;
var _1 = require(".");
var user_1 = require("./user");
var uuid_1 = require("uuid");
/**
 * available apis
 * get: package_list, group_list, organization_list, tag_list
 * create: package_create, group_create, organization_list,
 */
exports.CKAN_API_TOKEN_LOCALSTORAGE_KEY = "ckan_api_token_key";
var CKANAPIBase = /** @class */ (function () {
	function CKANAPIBase() {}
	CKANAPIBase.get = function () {};
	CKANAPIBase.create = function () {};
	CKANAPIBase.update = function () {};
	CKANAPIBase.remove = function () {};
	CKANAPIBase.BASE_CKAN_URL = "https://ark-evidence.adaptcentre.ie";
	CKANAPIBase.BASE_CKAN_API_URL = CKANAPIBase.BASE_CKAN_URL + "/api/action";
	// make sure create API key to do creation https://docs.ckan.org/en/2.9/api/index.html?highlight=user%20authorize#example-importing-datasets-with-the-ckan-api
	CKANAPIBase.API_KEY =
		"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJHV2NEWGhvdW9HRVRWM0N0MGhxdFkzRjJ2ZFY1MGgzU0x1ZFd1UmxmSEZsSTBuTWxVZXVPanJ6LXN0YXh3enJ2U0lfWHRYTVljYUpmOXI5QiIsImlhdCI6MTYyMTUxMjAxN30.1gHrU7hgSf6QC6MHUym8YdGliB4DkTbRakwDCyLxt8s";
	CKANAPIBase.API_KEY_ID =
		"GWcDXhouoGETV3Ct0hqtY3F2vdV50h3SLudWuRlfHFlI0nMlUeuOjrz-staxwzrvSI_XtXMYcaJf9r9B";
	CKANAPIBase.extreactIdFromURL = function (url) {
		try {
			var split = url.split("/");
			return split[split.length - 1];
		} catch (err) {
			console.error("extractIdFromURL - err: ", err);
		}
	};
	return CKANAPIBase;
})();
exports.CKANAPIBase = CKANAPIBase;
var loadCKANDataset = function (username, onOneDataLoaded, onFinish) {
	return __awaiter(void 0, void 0, void 0, function () {
		var apiToken, res, evidenceList, evidence, _i, _a, el, obj, err_1;
		return __generator(this, function (_b) {
			switch (_b.label) {
				case 0:
					_b.trys.push([0, 7, , 8]);
					return [4 /*yield*/, (0, exports.getUserAPIToken)(username)];
				case 1:
					apiToken = _b.sent();
					return [
						4 /*yield*/,
						_1.CKANPackageService.get(
							"list",
							{ include_private: true, limit: 5 },
							{ Authorization: apiToken }
						),
					];
				case 2:
					res = _b.sent();
					evidenceList = res.result;
					evidence = [];
					(_i = 0), (_a = evidenceList);
					_b.label = 3;
				case 3:
					if (!(_i < _a.length)) return [3 /*break*/, 6];
					el = _a[_i];
					return [4 /*yield*/, _1.CKANPackageService.get("show", { id: el })];
				case 4:
					obj = _b.sent();
					evidence.push(obj.result);
					if (onOneDataLoaded) onOneDataLoaded(obj.result);
					_b.label = 5;
				case 5:
					_i++;
					return [3 /*break*/, 3];
				case 6:
					if (onFinish) onFinish(evidence);
					return [3 /*break*/, 8];
				case 7:
					err_1 = _b.sent();
					console.log("loadCKANDataset - err: ", err_1);
					if (onFinish) onFinish([]);
					return [3 /*break*/, 8];
				case 8:
					return [2 /*return*/];
			}
		});
	});
};
exports.loadCKANDataset = loadCKANDataset;
var loadCKANDatasetSync = function (username, onOneDataLoaded) {
	return __awaiter(void 0, void 0, void 0, function () {
		var apiToken, res, evidenceList, evidence, _i, _a, el, obj, err_2;
		return __generator(this, function (_b) {
			switch (_b.label) {
				case 0:
					_b.trys.push([0, 7, , 8]);
					return [4 /*yield*/, (0, exports.getUserAPIToken)(username)];
				case 1:
					apiToken = _b.sent();
					return [
						4 /*yield*/,
						_1.CKANPackageService.get(
							"list",
							{ include_private: true, limit: 5 },
							{ Authorization: apiToken }
						),
					];
				case 2:
					res = _b.sent();
					evidenceList = res.result;
					evidence = [];
					(_i = 0), (_a = evidenceList);
					_b.label = 3;
				case 3:
					if (!(_i < _a.length)) return [3 /*break*/, 6];
					el = _a[_i];
					return [4 /*yield*/, _1.CKANPackageService.get("show", { id: el })];
				case 4:
					obj = _b.sent();
					evidence.push(obj.result);
					if (onOneDataLoaded) onOneDataLoaded(obj.result);
					_b.label = 5;
				case 5:
					_i++;
					return [3 /*break*/, 3];
				case 6:
					return [2 /*return*/, evidence];
				case 7:
					err_2 = _b.sent();
					console.log("loadCKANDataset - err: ", err_2);
					return [2 /*return*/, []];
				case 8:
					return [2 /*return*/];
			}
		});
	});
};
exports.loadCKANDatasetSync = loadCKANDatasetSync;
var searchCKANDataset = function (username, data, callback) {
	return __awaiter(void 0, void 0, void 0, function () {
		var apiToken, res, evidence, err_3;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					_a.trys.push([0, 3, , 4]);
					return [4 /*yield*/, (0, exports.getUserAPIToken)(username)];
				case 1:
					apiToken = _a.sent();
					console.log("ckan - searchCKANDataset - apiToken: ", apiToken);
					return [
						4 /*yield*/,
						_1.CKANPackageService.get("search", data, {
							Authorization: apiToken,
						}),
					];
				case 2:
					res = _a.sent();
					evidence = res.result.results;
					if (callback) callback(evidence);
					return [3 /*break*/, 4];
				case 3:
					err_3 = _a.sent();
					console.log("searchCKANDataset - err: ", err_3);
					if (callback) callback([]);
					return [3 /*break*/, 4];
				case 4:
					return [2 /*return*/];
			}
		});
	});
};
exports.searchCKANDataset = searchCKANDataset;
var searchCKANDatasetSync = function (username, data) {
	return __awaiter(void 0, void 0, void 0, function () {
		var apiToken, res, evidence, err_4;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					_a.trys.push([0, 3, , 4]);
					return [4 /*yield*/, (0, exports.getUserAPIToken)(username)];
				case 1:
					apiToken = _a.sent();
					console.log("ckan - searchCKANDataset - apiToken: ", apiToken);
					return [
						4 /*yield*/,
						_1.CKANPackageService.get("search", data, {
							Authorization: apiToken,
						}),
					];
				case 2:
					res = _a.sent();
					evidence = res.result.results;
					return [2 /*return*/, evidence];
				case 3:
					err_4 = _a.sent();
					console.log("searchCKANDataset - err: ", err_4);
					return [2 /*return*/, []];
				case 4:
					return [2 /*return*/];
			}
		});
	});
};
exports.searchCKANDatasetSync = searchCKANDatasetSync;
var getCKANDatasetAutocomplete = function (username, data) {
	return __awaiter(void 0, void 0, void 0, function () {
		var apiToken, res, evidence, err_5;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					_a.trys.push([0, 3, , 4]);
					return [4 /*yield*/, (0, exports.getUserAPIToken)(username)];
				case 1:
					apiToken = _a.sent();
					console.log("ckan - searchCKANDataset - apiToken: ", apiToken);
					return [
						4 /*yield*/,
						_1.CKANPackageService.get("autocomplete", data, {
							Authorization: apiToken,
						}),
					];
				case 2:
					res = _a.sent();
					evidence = res.result;
					return [2 /*return*/, evidence];
				case 3:
					err_5 = _a.sent();
					console.log("searchCKANDataset - err: ", err_5);
					return [2 /*return*/, []];
				case 4:
					return [2 /*return*/];
			}
		});
	});
};
exports.getCKANDatasetAutocomplete = getCKANDatasetAutocomplete;
var getUserAPIToken = function (username, admin, callback) {
	return __awaiter(void 0, void 0, void 0, function () {
		var token, err_6;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					_a.trys.push([0, 4, , 5]);
					if (admin) return [2 /*return*/, CKANAPIBase.API_KEY];
					if (
						!(
							localStorage &&
							localStorage.getItem(exports.CKAN_API_TOKEN_LOCALSTORAGE_KEY)
						)
					)
						return [3 /*break*/, 1];
					if (callback)
						callback(
							localStorage.getItem(exports.CKAN_API_TOKEN_LOCALSTORAGE_KEY)
						);
					return [
						2 /*return*/,
						localStorage.getItem(exports.CKAN_API_TOKEN_LOCALSTORAGE_KEY),
					];
				case 1:
					return [4 /*yield*/, (0, exports.requestAPIToken)(username)];
				case 2:
					token = _a.sent();
					if (callback) callback(token);
					return [2 /*return*/, token];
				case 3:
					return [3 /*break*/, 5];
				case 4:
					err_6 = _a.sent();
					console.error("ckan - getUserAPIToken - err: ", err_6);
					return [2 /*return*/, undefined];
				case 5:
					return [2 /*return*/];
			}
		});
	});
};
exports.getUserAPIToken = getUserAPIToken;
var requestAPIToken = function (username) {
	return __awaiter(void 0, void 0, void 0, function () {
		var res, err_7;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					_a.trys.push([0, 2, , 3]);
					return [
						4 /*yield*/,
						user_1.CKANUserService.create("api_token_create", {
							user: username,
							name: (0, uuid_1.v4)(),
						}),
					];
				case 1:
					res = _a.sent();
					console.log("ckan - requestAPIToken - res: ", res);
					return [2 /*return*/, res.result.token];
				case 2:
					err_7 = _a.sent();
					console.error("ckan - requestAPIToken - err: ", err_7);
					return [2 /*return*/, undefined];
				case 3:
					return [2 /*return*/];
			}
		});
	});
};
exports.requestAPIToken = requestAPIToken;
var getUserAPITokenList = function (username) {
	return __awaiter(void 0, void 0, void 0, function () {
		var res, err_8;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					_a.trys.push([0, 2, , 3]);
					return [
						4 /*yield*/,
						user_1.CKANUserService.get("api_token_list", { user: username }),
					];
				case 1:
					res = _a.sent();
					console.log("ckan - getUserAPITokenList - res: ", res);
					return [2 /*return*/, res.result];
				case 2:
					err_8 = _a.sent();
					console.error("ckan - getUserAPITokenList - err: ", err_8);
					return [2 /*return*/, undefined];
				case 3:
					return [2 /*return*/];
			}
		});
	});
};
exports.getUserAPITokenList = getUserAPITokenList;
var revokeUserAPIToken = function (data) {
	return __awaiter(void 0, void 0, void 0, function () {
		var res, err_9;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					_a.trys.push([0, 2, , 3]);
					return [
						4 /*yield*/,
						user_1.CKANUserService.remove("api_token_revoke", data),
					];
				case 1:
					res = _a.sent();
					console.log("ckan - getUserAPITokenList - res: ", res);
					return [2 /*return*/, res.success];
				case 2:
					err_9 = _a.sent();
					console.error("ckan - getUserAPITokenList - err: ", err_9);
					return [2 /*return*/, false];
				case 3:
					return [2 /*return*/];
			}
		});
	});
};
exports.revokeUserAPIToken = revokeUserAPIToken;
//# sourceMappingURL=base.js.map
