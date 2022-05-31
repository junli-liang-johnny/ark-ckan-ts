import { CKANAPIPackageSearchProps, CKANAPIPackageSearchResponse, CKANPackageService } from '.';
import { CKANAPIGetListResponse, CKANAPIPackage, CKANAPIPackageAutocompleteResponse, CKANAPIToken } from './types';
import { CKANUserService } from './user';
import { v4 as uuid4 } from 'uuid';
import { ckan_api_url, ckan_url, api_key, api_key_id } from '../ckan.config.json';

export const CKAN_API_TOKEN_LOCALSTORAGE_KEY = 'ckan_api_token_key';

export class CKANAPIBase {
  static BASE_CKAN_URL = ckan_url;
  static BASE_CKAN_API_URL = ckan_api_url;
  static API_KEY = api_key;
  static API_KEY_ID = api_key_id;

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