import { CKANAPIBase, CKANAPIBaseProps } from "./";
import { CKANAPIHeaders, CKANAPIAction, CKANAPIGetServiceResponse, CKANAPIResourceCreateProps, CKANAPIResourceSearchProps, CKANAPIResourceSearchResponse, CKANAPIResourceShowProps, CKANAPIResourceShowResponse, CKANAPIResourceUpdateProps } from "./types";
type ReturnType = CKANAPIResourceShowResponse | CKANAPIResourceSearchResponse;
export declare class CKANResourceService extends CKANAPIBase {
    constructor(props: CKANAPIBaseProps);
    dcatDistributionURL(datasetId: string, resourceId: string): string;
    static isDcatDistributionURL: (id: string | undefined) => boolean;
    static extractPackageId: (id: string) => string;
    get<T extends ReturnType>(action: CKANAPIAction, data: Partial<CKANAPIResourceShowProps & CKANAPIResourceSearchProps>, headers?: CKANAPIHeaders): Promise<CKANAPIGetServiceResponse<T>>;
    create(data: CKANAPIResourceCreateProps): Promise<CKANAPIResourceShowResponse>;
    update(data: CKANAPIResourceUpdateProps): Promise<CKANAPIResourceShowResponse>;
}
export {};
