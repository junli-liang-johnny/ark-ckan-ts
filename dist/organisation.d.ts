import { CKANAPIBase, CKANAPIBaseProps } from "./base";
import { CKANAPIGetListResponse, CKANAPIOrganisationGetListProps, CKANAPIOrganisationMemberCreateProps, CKANAPIOrganisationMemberCreateResponse, CKANAPIOrganisationShowResponse, CKANAPIOrganizationGetShowProps } from "./types";
export declare class CKANOrganisationService extends CKANAPIBase {
    constructor(props: CKANAPIBaseProps);
    get(type: "list" | "show", data: Partial<CKANAPIOrganisationGetListProps | CKANAPIOrganizationGetShowProps>): Promise<CKANAPIGetListResponse | CKANAPIOrganisationShowResponse>;
    create(type: "member_create", data: CKANAPIOrganisationMemberCreateProps): Promise<CKANAPIOrganisationMemberCreateResponse>;
}
