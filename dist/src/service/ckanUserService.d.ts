import { CKANAPIUserListProps, CKANAPIUserListResponse } from "../types";
import CKANService from "./ckanService";
declare class CKANUserService extends CKANService {
    constructor(url: string, auth?: string);
    list(data: CKANAPIUserListProps): Promise<CKANAPIUserListResponse>;
    delete(id: string): Promise<boolean>;
}
export default CKANUserService;
