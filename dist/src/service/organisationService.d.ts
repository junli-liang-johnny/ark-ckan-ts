import { CKANAPIOrganisationGetListProps, CKANOrganisationListResponse } from "../types";
import CKANService from "./ckanService";
declare class CKANOrganisationService extends CKANService {
    constructor(url: string, auth?: string);
    list(data: CKANAPIOrganisationGetListProps): Promise<CKANOrganisationListResponse>;
}
export default CKANOrganisationService;
