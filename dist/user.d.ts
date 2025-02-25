import { CKANAPIBase, CKANAPIBaseProps } from "./base";
import { CKANAPIResponse, CKANAPITokenRevokeProps, CKANAPIUserCreateProps, CKANAPIUserListResponse, CKANAPIUserhowProps, CKANAPIUserListProps, CKANAPIUserRemoveProps, CKANAPIUserShowResponse, CKANAPIUserTokenCreateProps, CKANAPIUserTokenCreateResponse, CKANAPIUserTokenProps, CKANAPIUserTokenResponse, CKANAPIUserUpdateProps } from "./types";
export declare class CKANUserService extends CKANAPIBase {
    constructor(props: CKANAPIBaseProps);
    get(type: "list" | "show" | "api_token_list", data: Partial<CKANAPIUserhowProps | CKANAPIUserListProps | CKANAPIUserTokenProps>): Promise<CKANAPIUserListResponse | CKANAPIUserShowResponse | CKANAPIUserTokenResponse>;
    create(type: "user_create" | "api_token_create", data: CKANAPIUserCreateProps | CKANAPIUserTokenCreateProps): Promise<CKANAPIUserShowResponse | CKANAPIUserTokenCreateResponse>;
    remove(type: "user_remove" | "api_token_revoke", data: CKANAPIUserRemoveProps | CKANAPITokenRevokeProps): Promise<CKANAPIResponse>;
    update(data: CKANAPIUserUpdateProps): Promise<CKANAPIUserShowResponse>;
}
