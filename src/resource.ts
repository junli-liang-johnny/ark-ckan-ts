import nodeFetch from 'node-fetch';
import NodeFormData from 'form-data';
import { CKANAPIBase } from './base';
import { CKANAPIHeaders, CKANAPIAction, CKANAPIGetServiceResponse, CKANAPIResourceCreateProps, CKANAPIResourceSearchProps, CKANAPIResourceSearchResponse, CKANAPIResourceShowProps, CKANAPIResourceShowResponse, CKANAPIResourceUpdateProps } from './types';

type ReturnType = CKANAPIResourceShowResponse | CKANAPIResourceSearchResponse;

export class CKANResourceService {

  static dcatDistributionURL(datasetId: string, resourceId: string) {
    return `${CKANAPIBase.BASE_CKAN_URL}/dataset/${datasetId}/resource/${resourceId}`;
  }

  static isDcatDistributionURL = (id: string | undefined) => {
    if (!id) return false;
    return id.includes('resource') && id.includes('dataset');
  }

  static extractPackageId = (id: string) => {
    const split = id.split('/');
    const packageIndex = split.indexOf('dataset');
    return split[packageIndex + 1];
  }

  static get<T extends ReturnType>(action: CKANAPIAction, data: Partial<CKANAPIResourceShowProps & CKANAPIResourceSearchProps>, headers?: CKANAPIHeaders): Promise<CKANAPIGetServiceResponse<T>> {
    return new Promise((resolve, reject) => {
      let url;

      if (action === 'search')
        url = `${CKANAPIBase.BASE_CKAN_API_URL}/resource_search?${new URLSearchParams(data as any).toString()}`;
      else if (action === 'show')
        url = `${CKANAPIBase.BASE_CKAN_API_URL}/resource_show?${new URLSearchParams(data as any).toString()}`;
      else
        url = `${CKANAPIBase.BASE_CKAN_API_URL}/resource_show?${new URLSearchParams(data as any).toString()}`;

      nodeFetch(url, { 'headers': { 'Authorization': headers?.Authorization || CKANAPIBase.API_KEY } })
        .then(res => res.json())
        .then(res => {
          return resolve(res as CKANAPIGetServiceResponse<T>);
        })
        .catch(err => {
          console.error('ckan - resource - get - err: ', err);
          reject(err);
        });
    });
  }

  // upload not working on nodejs
  static create(data: CKANAPIResourceCreateProps): Promise<CKANAPIResourceShowResponse> {
    return new Promise((resolve, reject) => {
      const url = `${CKANAPIBase.BASE_CKAN_API_URL}/resource_create`;
      // const formData = new FormData();
      const formData = new NodeFormData();
      Object.entries(data).forEach(([key, val]) => formData.append(key, val));

      nodeFetch(url, {
        'method': 'POST',
        'headers': {
          'Authorization': CKANAPIBase.API_KEY,
        },
        'body': formData
      })
        .then(res => res.json())
        .then(res => {
          console.debug('ckan - resource - create - res: ', res);
          return resolve(res as CKANAPIResourceShowResponse);
        })
        .catch(err => {
          console.error('ckan - resource - create - err: ', err);
          reject(err);
        })
    });
  }

  static remove() {

  }

  static update(data: CKANAPIResourceUpdateProps): Promise<CKANAPIResourceShowResponse> {
    return new Promise((resolve, reject) => {
      const url = `${CKANAPIBase.BASE_CKAN_API_URL}/resource_update`;
      const formData = new FormData();
      // const formData = new NodeFormData();
      Object.entries(data).forEach(([key, val]) => formData.append(key, val));

      fetch(url, {
        'method': 'POST',
        'headers': {
          'Authorization': CKANAPIBase.API_KEY
        },
        'body': formData
      })
        .then(res => res.json())
        .then(res => {
          console.debug('ckan - resource - create - res: ', res);
          return resolve(res as CKANAPIResourceShowResponse);
        })
        .catch(err => {
          console.error('ckan - resource - create - err: ', err);
          reject(err);
        })
    });
  }

}