import { CKANAPIBase, CKANAPIBaseProps } from "./base";
import { CKANAPIGetListResponse, CKANAPIGroupGetListProps, CKANAPIGroupGetShowProps, CKANAPIGroupShowResponse } from "./types";
export declare class CKANGroupService extends CKANAPIBase {
    constructor(props: CKANAPIBaseProps);
    get(data: Partial<CKANAPIGroupGetListProps | CKANAPIGroupGetShowProps>): Promise<CKANAPIGetListResponse | CKANAPIGroupShowResponse>;
}
