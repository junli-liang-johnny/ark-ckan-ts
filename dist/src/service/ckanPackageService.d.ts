import { CKANPackageListResponse } from "../types";
import CKANService from "./ckanService";
declare class CKANPackageService extends CKANService {
    constructor(url: string, auth?: string);
    list(data?: {
        limit?: number;
        offset?: number;
    }): Promise<CKANPackageListResponse>;
}
export default CKANPackageService;
