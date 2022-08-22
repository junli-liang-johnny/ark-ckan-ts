import { CKANAPIPackageSearchProps, CKANAPIPackage, CKANAPIToken } from './types';
export declare const loadCKANDataset: (username: string, onEachDataLoaded?: ((evi: CKANAPIPackage) => void) | undefined, onFinish?: ((evidence: CKANAPIPackage[]) => void) | undefined) => Promise<void>;
export declare const loadCKANDatasetSync: (username: string, onEachDataLoaded?: ((evi: CKANAPIPackage) => void) | undefined) => Promise<CKANAPIPackage[]>;
export declare const searchCKANDataset: (username: string, data: Partial<CKANAPIPackageSearchProps>, callback?: ((evidence: CKANAPIPackage[]) => void) | undefined) => Promise<void>;
export declare const searchCKANDatasetSync: (username: string, data: Partial<CKANAPIPackageSearchProps>) => Promise<CKANAPIPackage[]>;
export declare const getCKANDatasetAutocomplete: (username: string, data: Partial<CKANAPIPackageSearchProps>) => Promise<import("./types").CKANAPIPackageAutocompleteItem[]>;
export declare const getUserAPIToken: (username: string, admin?: boolean, callback?: ((token: string | undefined | null) => void) | undefined) => Promise<string | null | undefined>;
export declare const requestAPIToken: (username: string) => Promise<string | undefined>;
export declare const getUserAPITokenList: (username: string) => Promise<CKANAPIToken[] | undefined>;
export declare const revokeUserAPIToken: (data: {
    token?: string;
    jti?: string;
}) => Promise<boolean>;
