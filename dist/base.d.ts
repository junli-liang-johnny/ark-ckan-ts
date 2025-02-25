export declare const CKAN_API_TOKEN_LOCALSTORAGE_KEY = "ckan_api_token_key";
export interface CKANAPIBaseProps {
    ckanURL: string;
    ckanAPIURL: string;
    apiKey: string;
    apiKeyID: string;
}
export declare class CKANAPIBase {
    BASE_CKAN_URL: string;
    BASE_CKAN_API_URL: string;
    API_KEY: string;
    API_KEY_ID: string;
    constructor(props: CKANAPIBaseProps);
    static extreactIdFromURL: (url: string) => string | undefined;
}
