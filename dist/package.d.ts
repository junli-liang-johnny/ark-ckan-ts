import { CKANAPIBase, CKANAPIBaseProps } from "./base";
import { CKANAPIGetListResponse, CKANAPIHeaders, CKANAPIAction, CKANAPIGetServiceResponse, CKANAPIPackageAutocompleteResponse, CKANAPIPackageCreateProps, CKANAPIPackageListProps, CKANAPIPackageSearchProps, CKANAPIPackageSearchResponse, CKANAPIPackageShowProps, CKANAPIPackageShowResponse, CKANAPIPackageUpdateProps } from "./types";
type ReturnType = CKANAPIGetListResponse | CKANAPIPackageShowResponse | CKANAPIPackageSearchResponse | CKANAPIPackageAutocompleteResponse;
export declare class CKANPackageService extends CKANAPIBase {
    constructor(props: CKANAPIBaseProps);
    dcatDatasetURL(id: string): string;
    isDcatDatasetURL: (id: string | undefined) => boolean;
    get: <T extends ReturnType>(action: CKANAPIAction, data: Partial<CKANAPIPackageShowProps | CKANAPIPackageListProps | CKANAPIPackageSearchProps>, headers?: CKANAPIHeaders) => Promise<T>;
    create(data: CKANAPIPackageCreateProps): Promise<CKANAPIPackageShowResponse>;
    update(data: CKANAPIPackageUpdateProps): Promise<CKANAPIPackageShowResponse>;
    createGetURL: (action: CKANAPIAction, data: any) => string;
}
export {};
