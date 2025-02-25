import {
	CKAN_API_TOKEN_LOCALSTORAGE_KEY,
	CKANAPIBase,
	CKANAPIBaseProps,
	CKANAPIGetListResponse,
	CKANAPIPackage,
	CKANAPIPackageAutocompleteResponse,
	CKANAPIPackageSearchProps,
	CKANAPIPackageSearchResponse,
	CKANAPIToken,
	CKANPackageService,
	CKANUserService,
} from "./";
import { v4 as uuid4 } from "uuid";

export class Helper extends CKANAPIBase {
	ckanPackageService: CKANPackageService;
	ckanUserService: CKANUserService;

	constructor(props: CKANAPIBaseProps) {
		super(props);
		this.ckanPackageService = new CKANPackageService(props);
		this.ckanUserService = new CKANUserService(props);
	}

	loadCKANDataset = async (
		username: string,
		onOneDataLoaded?: (evi: CKANAPIPackage) => void,
		onFinish?: (evidence: CKANAPIPackage[]) => void
	) => {
		try {
			const apiToken = await this.getUserAPIToken(username);
			const res = await this.ckanPackageService.get(
				"list",
				{ include_private: true, limit: 5 },
				{ Authorization: apiToken }
			);
			const evidenceList = (res as CKANAPIGetListResponse).result;
			const evidence: CKANAPIPackage[] = [];

			for (const el of evidenceList as string[]) {
				const obj = await this.ckanPackageService.get("show", { id: el });
				evidence.push(obj.result as CKANAPIPackage);

				if (onOneDataLoaded) onOneDataLoaded(obj.result as CKANAPIPackage);
			}

			if (onFinish) onFinish(evidence);
		} catch (err) {
			console.log("loadCKANDataset - err: ", err);
			if (onFinish) onFinish([]);
		}
	};

	loadCKANDatasetSync = async (
		username: string,
		onOneDataLoaded?: (evi: CKANAPIPackage) => void
	) => {
		try {
			const apiToken = await this.getUserAPIToken(username);
			const res = await this.ckanPackageService.get(
				"list",
				{ include_private: true, limit: 5 },
				{ Authorization: apiToken }
			);
			const evidenceList = (res as CKANAPIGetListResponse).result;
			const evidence: CKANAPIPackage[] = [];

			for (const el of evidenceList as string[]) {
				const obj = await this.ckanPackageService.get("show", { id: el });
				evidence.push(obj.result as CKANAPIPackage);

				if (onOneDataLoaded) onOneDataLoaded(obj.result as CKANAPIPackage);
			}

			return evidence;
		} catch (err) {
			console.log("loadCKANDataset - err: ", err);
			return [];
		}
	};

	searchCKANDataset = async (
		username: string,
		data: Partial<CKANAPIPackageSearchProps>,
		callback?: (evidence: CKANAPIPackage[]) => void
	) => {
		try {
			const apiToken = await this.getUserAPIToken(username);
			console.log("ckan - searchCKANDataset - apiToken: ", apiToken);
			const res = await this.ckanPackageService.get("search", data, {
				Authorization: apiToken,
			});
			const evidence = (res as CKANAPIPackageSearchResponse).result.results;

			if (callback) callback(evidence);
		} catch (err) {
			console.log("searchCKANDataset - err: ", err);
			if (callback) callback([]);
		}
	};

	searchCKANDatasetSync = async (
		username: string,
		data: Partial<CKANAPIPackageSearchProps>
	) => {
		try {
			const apiToken = await this.getUserAPIToken(username);
			console.log("ckan - searchCKANDataset - apiToken: ", apiToken);
			const res = await this.ckanPackageService.get("search", data, {
				Authorization: apiToken,
			});
			const evidence = (res as CKANAPIPackageSearchResponse).result.results;

			return evidence;
		} catch (err) {
			console.log("searchCKANDataset - err: ", err);
			return [];
		}
	};

	getCKANDatasetAutocomplete = async (
		username: string,
		data: Partial<CKANAPIPackageSearchProps>
	) => {
		try {
			const apiToken = await this.getUserAPIToken(username);
			console.log("ckan - searchCKANDataset - apiToken: ", apiToken);
			const res = await this.ckanPackageService.get("autocomplete", data, {
				Authorization: apiToken,
			});
			const evidence = (res as CKANAPIPackageAutocompleteResponse).result;

			return evidence;
		} catch (err) {
			console.log("searchCKANDataset - err: ", err);
			return [];
		}
	};

	getUserAPIToken = async (
		username: string,
		admin?: boolean,
		callback?: (token: string | undefined | null) => void
	) => {
		try {
			if (admin) return this.API_KEY;

			// if run on browser
			if (
				localStorage &&
				localStorage.getItem(CKAN_API_TOKEN_LOCALSTORAGE_KEY)
			) {
				if (callback)
					callback(localStorage.getItem(CKAN_API_TOKEN_LOCALSTORAGE_KEY));
				return localStorage.getItem(CKAN_API_TOKEN_LOCALSTORAGE_KEY);
			} else {
				// node
				const token = await this.requestAPIToken(username);
				if (callback) callback(token);
				return token;
			}
		} catch (err) {
			console.error("ckan - getUserAPIToken - err: ", err);
			return undefined;
		}
	};

	requestAPIToken = async (username: string): Promise<string | undefined> => {
		try {
			const res = await this.ckanUserService.create("api_token_create", {
				user: username,
				name: uuid4(),
			});
			console.log("ckan - requestAPIToken - res: ", res);
			return (res.result as { token: string }).token;
		} catch (err) {
			console.error("ckan - requestAPIToken - err: ", err);
			return undefined;
		}
	};

	getUserAPITokenList = async (username: string) => {
		try {
			const res = await this.ckanUserService.get("api_token_list", {
				user: username,
			});
			console.log("ckan - getUserAPITokenList - res: ", res);
			return res.result as CKANAPIToken[];
		} catch (err) {
			console.error("ckan - getUserAPITokenList - err: ", err);
			return undefined;
		}
	};

	revokeUserAPIToken = async (data: {
		token?: string;
		jti?: string;
	}): Promise<boolean> => {
		try {
			const res = await this.ckanUserService.remove("api_token_revoke", data);
			console.log("ckan - getUserAPITokenList - res: ", res);
			return res.success;
		} catch (err) {
			console.error("ckan - getUserAPITokenList - err: ", err);
			return false;
		}
	};
}
