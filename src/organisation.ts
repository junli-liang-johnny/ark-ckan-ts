import { CKANAPIBase } from '.';
import { CKANAPIGetListResponse, CKANAPIOrganisationGetListProps, CKANAPIOrganisationMemberCreateProps, CKANAPIOrganisationMemberCreateResponse, CKANAPIOrganisationShowResponse, CKANAPIOrganizationGetShowProps } from './types';

export class CKANAPIOrganisationService {

  static get(type: 'list' | 'show', data: Partial<CKANAPIOrganisationGetListProps | CKANAPIOrganizationGetShowProps>): Promise<CKANAPIGetListResponse | CKANAPIOrganisationShowResponse> {
    return new Promise((resolve, reject) => {
      let url;

      if (type === 'list')
        url = `${CKANAPIBase.BASE_CKAN_API_URL}/organization_list?${new URLSearchParams(data as any).toString()}`;
      else
        url = `${CKANAPIBase.BASE_CKAN_API_URL}/organization_show?${new URLSearchParams(data as any).toString()}`;

      fetch(url)
        .then(res => res.json())
        .then(res => {
          resolve(res as CKANAPIGetListResponse | CKANAPIOrganisationShowResponse);
        })
        .catch(err => reject(err));
    });
  }

  static create(type: 'member_create', data: CKANAPIOrganisationMemberCreateProps): Promise<CKANAPIOrganisationMemberCreateResponse> {
    return new Promise((resolve, reject) => {
      // console.log('ckan organisation - data: ', data);
      let url;
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => formData.append(key, val));

      if (type === 'member_create')
        url = `${CKANAPIBase.BASE_CKAN_API_URL}/organization_member_create`;
      else
        url = `${CKANAPIBase.BASE_CKAN_API_URL}/organization_member_create`;

      fetch(url, { 'method': 'POST', 'headers': { 'Authorization': CKANAPIBase.API_KEY }, 'body': formData })
        .then(res => res.json())
        .then(res => {
          // console.log('ckan organisation - res: ', res);
          if (type === 'member_create')
            return resolve(res as CKANAPIOrganisationMemberCreateResponse);

          resolve(res);
        })
        .catch(err => reject(err));

    });
  }

  static remove() {

  }

  static update() {

  }

}