import { CKANUserService } from "./user";
import { CKANAPIBase, CKAN_API_TOKEN_LOCALSTORAGE_KEY } from "./base";
import { CKANPackageService } from "./package";
import { CKANAPIPackageSearchProps, CKANAPIPackageSearchResponse, CKANAPIGetListResponse, CKANAPIPackage, CKANAPIPackageAutocompleteResponse, CKANAPIToken } from './types';
import { v4 as uuid4 } from 'uuid';

export const loadCKANDataset = async (
	username: string,
	onEachDataLoaded?: (evi: CKANAPIPackage) => void,
	onFinish?: (evidence: CKANAPIPackage[]) => void
) => {
	try {
		const apiToken = await getUserAPIToken(username);
		const res = await CKANPackageService.get('list', {
			'include_private': true,
			'limit': 5
		}, {
			'Authorization': apiToken
		});
		const evidenceList = (res as CKANAPIGetListResponse).result;
		const promises = evidenceList.map(async id => {
			const obj = await CKANPackageService.get('show', { id });
			const result = obj.result as CKANAPIPackage;

			if (onEachDataLoaded) {
				onEachDataLoaded(result);
			}

			return result;
		});
		const results = await Promise.all(promises);

		if (onFinish) {
			onFinish(results);
		}

	} catch (err) {
		console.error('loadCKANDataset - err: ', err);
		if (onFinish) {
			onFinish([]);
		}
	}
};

export const loadCKANDatasetSync = async (
	username: string,
	onEachDataLoaded?: (evi: CKANAPIPackage) => void
) => {
	try {
		const apiToken = await getUserAPIToken(username);
		const res = await CKANPackageService.get('list', {
			'include_private': true,
			'limit': 5
		}, {
			'Authorization': apiToken
		});
		const evidenceList = (res as CKANAPIGetListResponse).result;
		const promises = evidenceList.map(async id => {
			const obj = await CKANPackageService.get('show', { id });
			const result = obj.result as CKANAPIPackage;

			if (onEachDataLoaded) {
				onEachDataLoaded(result);
			}

			return result;
		});
		const results = await Promise.all(promises);

		return results;

	} catch (err) {
		console.error('loadCKANDatasetSync - err: ', err);
		return [];
	}
};

export const searchCKANDataset = async (
	username: string,
	data: Partial<CKANAPIPackageSearchProps>,
	callback?: (evidence: CKANAPIPackage[]) => void
) => {
	try {
		const apiToken = await getUserAPIToken(username);
		console.debug('ckan - searchCKANDataset - apiToken: ', apiToken);
		const res = await CKANPackageService.get(
			'search',
			data,
			{ 'Authorization': apiToken }
		);
		const evidence = (res as CKANAPIPackageSearchResponse).result.results;

		if (callback) {
			callback(evidence);
		}
	} catch (err) {
		console.error('searchCKANDataset - err: ', err);
		if (callback) {
			callback([]);
		}
	}
};

export const searchCKANDatasetSync = async (
	username: string,
	data: Partial<CKANAPIPackageSearchProps>
) => {
	try {
		const apiToken = await getUserAPIToken(username);
		console.debug('ckan - searchCKANDataset - apiToken: ', apiToken);
		const res = await CKANPackageService.get(
			'search',
			data,
			{ 'Authorization': apiToken }
		);
		const evidence = (res as CKANAPIPackageSearchResponse).result.results;

		return evidence;
	} catch (err) {
		console.error('searchCKANDataset - err: ', err);
		return [];
	}
};

export const getCKANDatasetAutocomplete = async (
	username: string,
	data: Partial<CKANAPIPackageSearchProps>
) => {
	try {
		const apiToken = await getUserAPIToken(username);
		console.debug('ckan - searchCKANDataset - apiToken: ', apiToken);
		const res = await CKANPackageService.get(
			'autocomplete',
			data,
			{ 'Authorization': apiToken }
		);
		const evidence = (res as CKANAPIPackageAutocompleteResponse).result;

		return evidence;
	} catch (err) {
		console.error('searchCKANDataset - err: ', err);
		return [];
	}
}

export const getUserAPIToken = async (
	username: string,
	admin?: boolean,
	callback?: (token: string | undefined | null) => void
) => {
	try {
		if (admin) {
			return CKANAPIBase.API_KEY;
		}

		// if run on browser
		if (
			typeof localStorage !== 'undefined' &&
			localStorage &&
			localStorage.getItem(CKAN_API_TOKEN_LOCALSTORAGE_KEY)
		) {
			if (callback) callback(localStorage.getItem(CKAN_API_TOKEN_LOCALSTORAGE_KEY));
			return localStorage.getItem(CKAN_API_TOKEN_LOCALSTORAGE_KEY);

		} else { // node 
			const token = await requestAPIToken(username);
			if (callback) callback(token);
			return token;
		}
	} catch (err) {
		console.error('ckan - getUserAPIToken - err: ', err);
		return undefined
	}
};

export const requestAPIToken = async (username: string): Promise<string | undefined> => {
	try {
		const res = await CKANUserService.create(
			'api_token_create',
			{ 'user': username, 'name': uuid4() }
		);
		console.debug('ckan - requestAPIToken - res: ', res);
		return (res.result as { token: string }).token;

	} catch (err) {
		console.error('ckan - requestAPIToken - err: ', err);
		return undefined;
	}
};

export const getUserAPITokenList = async (username: string) => {
	try {
		const res = await CKANUserService.get(
			'api_token_list',
			{ 'user': username }
		);
		console.debug('ckan - getUserAPITokenList - res: ', res);
		return res.result as CKANAPIToken[];

	} catch (err) {
		console.error('ckan - getUserAPITokenList - err: ', err);
		return undefined;
	}
};

export const revokeUserAPIToken = async (data: {
	token?: string,
	jti?: string
}): Promise<boolean> => {
	try {
		const res = await CKANUserService.remove('api_token_revoke', data);
		console.debug('ckan - revokeUserAPIToken - res: ', res);
		return res.success;

	} catch (err) {
		console.error('ckan - revokeUserAPIToken - err: ', err);
		return false;
	}
};