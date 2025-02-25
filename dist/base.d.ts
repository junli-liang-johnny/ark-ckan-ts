export declare const CKAN_API_TOKEN_LOCALSTORAGE_KEY = "ckan_api_token_key";
export interface CKANAPIBaseProps {
    ckan_url: string;
    ckan_api_url: string;
    api_key: string;
    api_key_id: string;
}
export declare class CKANAPIBase {
    BASE_CKAN_URL: string;
    BASE_CKAN_API_URL: string;
    API_KEY: string;
    API_KEY_ID: string;
    constructor(props: CKANAPIBaseProps);
    static extreactIdFromURL: (url: string) => string | undefined;
}
