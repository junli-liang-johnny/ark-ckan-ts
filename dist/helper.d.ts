import { CKANAPIBase, CKANAPIBaseProps, CKANAPIPackage, CKANAPIPackageSearchProps, CKANAPIToken, CKANPackageService, CKANUserService } from "./";
export declare class Helper extends CKANAPIBase {
    ckanPackageService: CKANPackageService;
    ckanUserService: CKANUserService;
    constructor(props: CKANAPIBaseProps);
    loadCKANDataset: (username: string, onOneDataLoaded?: ((evi: CKANAPIPackage) => void) | undefined, onFinish?: ((evidence: CKANAPIPackage[]) => void) | undefined) => Promise<void>;
    loadCKANDatasetSync: (username: string, onOneDataLoaded?: ((evi: CKANAPIPackage) => void) | undefined) => Promise<CKANAPIPackage[]>;
    searchCKANDataset: (username: string, data: Partial<CKANAPIPackageSearchProps>, callback?: ((evidence: CKANAPIPackage[]) => void) | undefined) => Promise<void>;
    searchCKANDatasetSync: (username: string, data: Partial<CKANAPIPackageSearchProps>) => Promise<CKANAPIPackage[]>;
    getCKANDatasetAutocomplete: (username: string, data: Partial<CKANAPIPackageSearchProps>) => Promise<import("./types").CKANAPIPackageAutocompleteItem[]>;
    getUserAPIToken: (username: string, admin?: boolean, callback?: ((token: string | undefined | null) => void) | undefined) => Promise<string | null | undefined>;
    requestAPIToken: (username: string) => Promise<string | undefined>;
    getUserAPITokenList: (username: string) => Promise<CKANAPIToken[] | undefined>;
    revokeUserAPIToken: (data: {
        token?: string;
        jti?: string;
    }) => Promise<boolean>;
}
