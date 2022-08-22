import fetch from 'node-fetch';
import { CKANAPIBase } from './base';
import { CKANAPIGetListResponse, CKANAPIGroupGetListProps, CKANAPIGroupGetShowProps, CKANAPIGroupShowResponse } from './types';

const getListParamArray: (keyof CKANAPIGroupGetListProps)[] = ['all_fields', 'groups', 'include_dataset_count', 'include_extras', 'include_groups', 'include_tags', 'include_users', 'limit', 'offset', 'order_by', 'sort'];

export class CKANGroupService {

  static get(data: Partial<CKANAPIGroupGetListProps | CKANAPIGroupGetShowProps>): Promise<CKANAPIGetListResponse | CKANAPIGroupShowResponse> {
    return new Promise((resolve, reject) => {
      let url;

      if (Object.keys(data).every(el => getListParamArray.includes(el as keyof CKANAPIGroupGetListProps)))
        url = `${CKANAPIBase.BASE_CKAN_API_URL}/group_list?${new URLSearchParams(data as any).toString()}`;
      else
        url = `${CKANAPIBase.BASE_CKAN_API_URL}/group_show?${new URLSearchParams(data as any).toString()}`;

      fetch(url)
        .then(res => res.json())
        .then(res => {
          resolve(res as CKANAPIGetListResponse | CKANAPIGroupShowResponse);
        })
        .catch(err => reject(err));
    });
  }

  static create() {

  }

  static remove() {

  }

  static update() {

  }

}