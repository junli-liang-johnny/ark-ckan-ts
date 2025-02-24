import { CKANAPIGetListResponse, CKANAPIHeaders, CKANAPIAction, CKANAPIGetServiceResponse, CKANAPIPackageAutocompleteResponse, CKANAPIPackageCreateProps, CKANAPIPackageListProps, CKANAPIPackageSearchProps, CKANAPIPackageSearchResponse, CKANAPIPackageShowProps, CKANAPIPackageShowResponse, CKANAPIPackageUpdateProps } from "./types";
type ReturnType = CKANAPIGetListResponse | CKANAPIPackageShowResponse | CKANAPIPackageSearchResponse | CKANAPIPackageAutocompleteResponse;
export declare class CKANPackageService {
    static dcatDatasetURL(id: string): string;
    static isDcatDatasetURL: (id: string | undefined) => boolean;
    static get: <T extends ReturnType>(action: CKANAPIAction, data: Partial<CKANAPIPackageShowProps | CKANAPIPackageListProps | CKANAPIPackageSearchProps>, headers?: CKANAPIHeaders) => Promise<T>;
    static create(data: CKANAPIPackageCreateProps): Promise<CKANAPIPackageShowResponse>;
    static remove(): void;
    static update(data: CKANAPIPackageUpdateProps): Promise<CKANAPIPackageShowResponse>;
}
export {};
