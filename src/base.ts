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