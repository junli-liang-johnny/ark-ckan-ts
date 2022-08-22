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
