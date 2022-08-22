import { CKANAPIGetListResponse, CKANAPIGroupGetListProps, CKANAPIGroupGetShowProps, CKANAPIGroupShowResponse } from './types';
export declare class CKANGroupService {
    static get(data: Partial<CKANAPIGroupGetListProps | CKANAPIGroupGetShowProps>): Promise<CKANAPIGetListResponse | CKANAPIGroupShowResponse>;
    static create(): void;
    static remove(): void;
    static update(): void;
}
