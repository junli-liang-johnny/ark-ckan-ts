import { CKANAPIHeaders, CKANAPIAction, CKANAPIGetServiceResponse, CKANAPIResourceCreateProps, CKANAPIResourceSearchProps, CKANAPIResourceSearchResponse, CKANAPIResourceShowProps, CKANAPIResourceShowResponse, CKANAPIResourceUpdateProps } from './types';
declare type ReturnType = CKANAPIResourceShowResponse | CKANAPIResourceSearchResponse;
export declare class CKANResourceService {
    static dcatDistributionURL(datasetId: string, resourceId: string): string;
    static isDcatDistributionURL: (id: string | undefined) => boolean;
    static extractPackageId: (id: string) => string;
    static get<T extends ReturnType>(action: CKANAPIAction, data: Partial<CKANAPIResourceShowProps & CKANAPIResourceSearchProps>, headers?: CKANAPIHeaders): Promise<CKANAPIGetServiceResponse<T>>;
    static create(data: CKANAPIResourceCreateProps): Promise<CKANAPIResourceShowResponse>;
    static remove(): void;
    static update(data: CKANAPIResourceUpdateProps): Promise<CKANAPIResourceShowResponse>;
}
export {};
