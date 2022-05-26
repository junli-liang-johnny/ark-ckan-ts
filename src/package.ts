import nodeFetch from 'node-fetch';
import NodeFormData from 'form-data';
import { CKANAPIBase } from '.';
import { CKANAPIGetListResponse, CKANAPIHeaders, CKANAPIAction, CKANAPIGetServiceResponse, CKANAPIPackageAutocompleteResponse, CKANAPIPackageCreateProps, CKANAPIPackageListProps, CKANAPIPackageSearchProps, CKANAPIPackageSearchResponse, CKANAPIPackageShowProps, CKANAPIPackageShowResponse, CKANAPIPackageUpdateProps } from './types';

type ReturnType = CKANAPIGetListResponse | CKANAPIPackageShowResponse | CKANAPIPackageSearchResponse | CKANAPIPackageAutocompleteResponse;

export class CKANPackageService {

  static dcatDatasetURL(id: string) {
    return `${CKANAPIBase.BASE_CKAN_URL}/dataset/${id}`;
  }

  static isDcatDatasetURL = (id: string | undefined) => {
    if (!id) return false;
    return id.includes('dataset') && !id.includes('resource');
  }

  static get = <T extends ReturnType>(action: CKANAPIAction, data: Partial<CKANAPIPackageShowProps | CKANAPIPackageListProps | CKANAPIPackageSearchProps>, headers?: CKANAPIHeaders): Promise<CKANAPIGetServiceResponse<T>> => {
    return new Promise((resolve, reject) => {
      console.log('ckan package - get - data: ', data, ', headers: ', headers);

      const url = createGetURL(action, data);

      nodeFetch(url, { 'headers': { 'Authorization': headers?.Authorization || CKANAPIBase.API_KEY } })
        .then(res => res.json())
        .then(res => {
          return resolve(res as CKANAPIGetServiceResponse<T>);
        })
        .catch(err => {
          console.error('ckan - package - get - err: ', err);
          reject(err);
        });
    });
  }

  static create(data: CKANAPIPackageCreateProps): Promise<CKANAPIPackageShowResponse> {
    return new Promise((resolve, reject) => {
      const url = `${CKANAPIBase.BASE_CKAN_API_URL}/package_create`;
      // const formData = new FormData();
      const formData = new NodeFormData();
      Object.entries(data).forEach(([key, val]) => formData.append(key, val));

      nodeFetch(url, {
        'method': 'POST',
        'headers': {
          'Authorization': CKANAPIBase.API_KEY,
          // 'Content-Type': 'application/json'
        },
        'body': formData
      })
        .then(res => res.json())
        .then(res => {
          return resolve(res as CKANAPIPackageShowResponse);
        })
        .catch(err => {
          console.error('ckan - package - create - err: ', err);
          reject(err);
        });
    });
  }

  static remove() {

  }

  static update(data: CKANAPIPackageUpdateProps): Promise<CKANAPIPackageShowResponse> {
    return new Promise((resolve, reject) => {
      const url = `${CKANAPIBase.BASE_CKAN_API_URL}/package_update`;

      fetch(url, {
        'method': 'POST',
        'headers': {
          'Authorization': CKANAPIBase.API_KEY,
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          return resolve(res as CKANAPIPackageShowResponse);
        })
        .catch(err => {
          console.error('ckan - package - create - err: ', err);
          reject(err);
        });
    });
  }
}

const createGetURL = (action: CKANAPIAction, data: any) => {
  let url: string;
  if (action === 'search')
    url = `${CKANAPIBase.BASE_CKAN_API_URL}/package_search?${new URLSearchParams(data as any).toString()}`;
  else if (action === 'show')
    url = `${CKANAPIBase.BASE_CKAN_API_URL}/package_show?${new URLSearchParams(data as any).toString()}`;
  else if (action === 'autocomplete')
    url = `${CKANAPIBase.BASE_CKAN_API_URL}/package_autocomplete?${new URLSearchParams(data as any).toString()}`;
  else
    url = `${CKANAPIBase.BASE_CKAN_API_URL}/package_list?${new URLSearchParams(data as any).toString()}`;

  return url;
}