import { CKANAPIGetListResponse, CKANAPIOrganisationGetListProps, CKANAPIOrganisationMemberCreateProps, CKANAPIOrganisationMemberCreateResponse, CKANAPIOrganisationShowResponse, CKANAPIOrganizationGetShowProps } from "./types";
export declare class CKANAPIOrganisationService {
    static get(type: "list" | "show", data: Partial<CKANAPIOrganisationGetListProps | CKANAPIOrganizationGetShowProps>): Promise<CKANAPIGetListResponse | CKANAPIOrganisationShowResponse>;
    static create(type: "member_create", data: CKANAPIOrganisationMemberCreateProps): Promise<CKANAPIOrganisationMemberCreateResponse>;
    static remove(): void;
    static update(): void;
}
