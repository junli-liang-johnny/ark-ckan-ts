import { CKANAPIPackageSearchProps } from '.';
import { CKANAPIPackage, CKANAPIToken } from './types';
export declare const CKAN_API_TOKEN_LOCALSTORAGE_KEY = "ckan_api_token_key";
export declare class CKANAPIBase {
    static BASE_CKAN_URL: string;
    static BASE_CKAN_API_URL: string;
    static API_KEY: string;
    static API_KEY_ID: string;
    constructor();
    static get(): void;
    static create(): void;
    static update(): void;
    static remove(): void;
    static extreactIdFromURL: (url: string) => string | undefined;
}
export declare const loadCKANDataset: (username: string, onOneDataLoaded?: ((evi: CKANAPIPackage) => void) | undefined, onFinish?: ((evidence: CKANAPIPackage[]) => void) | undefined) => Promise<void>;
export declare const loadCKANDatasetSync: (username: string, onOneDataLoaded?: ((evi: CKANAPIPackage) => void) | undefined) => Promise<CKANAPIPackage[]>;
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
