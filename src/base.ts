import { CKANAPIPackageSearchProps, CKANAPIPackageSearchResponse, CKANPackageService } from '.';
import { CKANAPIGetListResponse, CKANAPIPackage, CKANAPIPackageAutocompleteResponse, CKANAPIToken } from './types';
import { CKANUserService } from './user';
import { v4 as uuid4 } from 'uuid';

/**
 * available apis
 * get: package_list, group_list, organization_list, tag_list
 * create: package_create, group_create, organization_list, 
 */
export const CKAN_API_TOKEN_LOCALSTORAGE_KEY = 'ckan_api_token_key';

export class CKANAPIBase {
  static BASE_CKAN_URL = 'https://openark.adaptcentre.ie/ARKEvidence';
  static BASE_CKAN_API_URL = CKANAPIBase.BASE_CKAN_URL + '/api/action';
  // make sure create API key to do creation https://docs.ckan.org/en/2.9/api/index.html?highlight=user%20authorize#example-importing-datasets-with-the-ckan-api
  static API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJHV2NEWGhvdW9HRVRWM0N0MGhxdFkzRjJ2ZFY1MGgzU0x1ZFd1UmxmSEZsSTBuTWxVZXVPanJ6LXN0YXh3enJ2U0lfWHRYTVljYUpmOXI5QiIsImlhdCI6MTYyMTUxMjAxN30.1gHrU7hgSf6QC6MHUym8YdGliB4DkTbRakwDCyLxt8s'
  static API_KEY_ID = 'GWcDXhouoGETV3Ct0hqtY3F2vdV50h3SLudWuRlfHFlI0nMlUeuOjrz-staxwzrvSI_XtXMYcaJf9r9B';

  constructor() { }

  static get() {

  }

  static create() {

  }

  static update() {

  }

  static remove() {

  }

  static extreactIdFromURL = (url: string) => {
    try {
      const split = url.split('/');

      return split[split.length - 1];
    } catch (err) {
      console.error('extractIdFromURL - err: ', err);
    }
  }
}

export const loadCKANDataset = async (username: string, onOneDataLoaded?: (evi: CKANAPIPackage) => void, onFinish?: (evidence: CKANAPIPackage[]) => void) => {
  try {
    const apiToken = await getUserAPIToken(username);
    const res = await CKANPackageService.get('list', { 'include_private': true, 'limit': 5 }, { 'Authorization': apiToken });
    const evidenceList = (res as CKANAPIGetListResponse).result;
    const evidence: CKANAPIPackage[] = [];

    for (const el of evidenceList as string[]) {
      const obj = await CKANPackageService.get('show', { 'id': el });
      evidence.push(obj.result as CKANAPIPackage);

      if (onOneDataLoaded) onOneDataLoaded(obj.result as CKANAPIPackage);
    }

    if (onFinish)
      onFinish(evidence);
  } catch (err) {
    console.log('loadCKANDataset - err: ', err);
    if (onFinish)
      onFinish([]);
  }
};

export const loadCKANDatasetSync = async (username: string, onOneDataLoaded?: (evi: CKANAPIPackage) => void) => {
  try {
    const apiToken = await getUserAPIToken(username);
    const res = await CKANPackageService.get('list', { 'include_private': true, 'limit': 5 }, { 'Authorization': apiToken });
    const evidenceList = (res as CKANAPIGetListResponse).result;
    const evidence: CKANAPIPackage[] = [];

    for (const el of evidenceList as string[]) {
      const obj = await CKANPackageService.get('show', { 'id': el });
      evidence.push(obj.result as CKANAPIPackage);

      if (onOneDataLoaded) onOneDataLoaded(obj.result as CKANAPIPackage);
    }

    return evidence;
  } catch (err) {
    console.log('loadCKANDataset - err: ', err);
    return [];
  }
};

export const searchCKANDataset = async (username: string, data: Partial<CKANAPIPackageSearchProps>, callback?: (evidence: CKANAPIPackage[]) => void) => {
  try {
    const apiToken = await getUserAPIToken(username);
    console.log('ckan - searchCKANDataset - apiToken: ', apiToken);
    const res = await CKANPackageService.get('search', data, { 'Authorization': apiToken });
    const evidence = (res as CKANAPIPackageSearchResponse).result.results;

    if (callback)
      callback(evidence);
  } catch (err) {
    console.log('searchCKANDataset - err: ', err);
    if (callback)
      callback([]);
  }
};

export const searchCKANDatasetSync = async (username: string, data: Partial<CKANAPIPackageSearchProps>) => {
  try {
    const apiToken = await getUserAPIToken(username);
    console.log('ckan - searchCKANDataset - apiToken: ', apiToken);
    const res = await CKANPackageService.get('search', data, { 'Authorization': apiToken });
    const evidence = (res as CKANAPIPackageSearchResponse).result.results;

    return evidence;
  } catch (err) {
    console.log('searchCKANDataset - err: ', err);
    return [];
  }
};

export const getCKANDatasetAutocomplete = async (username: string, data: Partial<CKANAPIPackageSearchProps>) => {
  try {
    const apiToken = await getUserAPIToken(username);
    console.log('ckan - searchCKANDataset - apiToken: ', apiToken);
    const res = await CKANPackageService.get('autocomplete', data, { 'Authorization': apiToken });
    const evidence = (res as CKANAPIPackageAutocompleteResponse).result;

    return evidence;
  } catch (err) {
    console.log('searchCKANDataset - err: ', err);
    return [];
  }
}

export const getUserAPIToken = async (username: string, admin?: boolean, callback?: (token: string | undefined | null) => void) => {
  try {
    if (admin) return CKANAPIBase.API_KEY;

    // if run on browser
    if (localStorage && localStorage.getItem(CKAN_API_TOKEN_LOCALSTORAGE_KEY)) {
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
    const res = await CKANUserService.create('api_token_create', { 'user': username, 'name': uuid4() });
    console.log('ckan - requestAPIToken - res: ', res);
    return (res.result as { token: string }).token;

  } catch (err) {
    console.error('ckan - requestAPIToken - err: ', err);
    return undefined;
  }
};

export const getUserAPITokenList = async (username: string) => {
  try {
    const res = await CKANUserService.get('api_token_list', { 'user': username });
    console.log('ckan - getUserAPITokenList - res: ', res);
    return res.result as CKANAPIToken[];

  } catch (err) {
    console.error('ckan - getUserAPITokenList - err: ', err);
    return undefined;
  }
};

export const revokeUserAPIToken = async (data: { token?: string, jti?: string }): Promise<boolean> => {
  try {
    const res = await CKANUserService.remove('api_token_revoke', data);
    console.log('ckan - getUserAPITokenList - res: ', res);
    return res.success;

  } catch (err) {
    console.error('ckan - getUserAPITokenList - err: ', err);
    return false;
  }
};