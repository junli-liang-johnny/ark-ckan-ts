export const CKAN_API_TOKEN_LOCALSTORAGE_KEY = "ckan_api_token_key";

export interface CKANAPIBaseProps {
	ckan_url: string;
	ckan_api_url: string;
	api_key: string;
	api_key_id: string;
}

export class CKANAPIBase {
	BASE_CKAN_URL: string;
	BASE_CKAN_API_URL: string;
	API_KEY: string;
	API_KEY_ID: string;

	constructor(props: CKANAPIBaseProps) {
		this.BASE_CKAN_URL = props.ckan_url;
		this.BASE_CKAN_API_URL = props.ckan_api_url;
		this.API_KEY = props.api_key;
		this.API_KEY_ID = props.api_key_id;
	}

	static extreactIdFromURL = (url: string) => {
		try {
			const split = url.split("/");

			return split[split.length - 1];
		} catch (err) {
			console.error("extractIdFromURL - err: ", err);
		}
	};
}
