import { CKANAPIBase, CKANAPIBaseProps } from "./";
import { CKANAPIGetListResponse, CKANAPIOrganisationGetListProps, CKANAPIOrganisationMemberCreateProps, CKANAPIOrganisationMemberCreateResponse, CKANAPIOrganisationShowResponse, CKANAPIOrganizationGetShowProps } from "./types";
export declare class CKANAPIOrganisationService extends CKANAPIBase {
    constructor(props: CKANAPIBaseProps);
    get(type: "list" | "show", data: Partial<CKANAPIOrganisationGetListProps | CKANAPIOrganizationGetShowProps>): Promise<CKANAPIGetListResponse | CKANAPIOrganisationShowResponse>;
    create(type: "member_create", data: CKANAPIOrganisationMemberCreateProps): Promise<CKANAPIOrganisationMemberCreateResponse>;
}
