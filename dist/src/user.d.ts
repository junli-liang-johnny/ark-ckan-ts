import { CKANAPIResponse, CKANAPITokenRevokeProps, CKANAPIUserCreateProps, CKANAPIUserGetResponse, CKANAPIUserhowProps, CKANAPIUserListProps, CKANAPIUserRemoveProps, CKANAPIUserShowResponse, CKANAPIUserTokenCreateProps, CKANAPIUserTokenCreateResponse, CKANAPIUserTokenProps, CKANAPIUserTokenResponse, CKANAPIUserUpdateProps } from './types';
export declare class CKANUserService {
    static get(type: 'list' | 'show' | 'api_token_list', data: Partial<CKANAPIUserhowProps | CKANAPIUserListProps | CKANAPIUserTokenProps>): Promise<CKANAPIUserGetResponse | CKANAPIUserShowResponse | CKANAPIUserTokenResponse>;
    static create(type: 'user_create' | 'api_token_create', data: CKANAPIUserCreateProps | CKANAPIUserTokenCreateProps): Promise<CKANAPIUserShowResponse | CKANAPIUserTokenCreateResponse>;
    static remove(type: 'user_remove' | 'api_token_revoke', data: CKANAPIUserRemoveProps | CKANAPITokenRevokeProps): Promise<CKANAPIResponse>;
    static update(data: CKANAPIUserUpdateProps): Promise<CKANAPIUserShowResponse>;
}
