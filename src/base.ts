export const CKAN_API_TOKEN_LOCALSTORAGE_KEY = "ckan_api_token_key";

export interface CKANAPIBaseProps {
	ckanURL: string;
	ckanAPIURL: string;
	apiKey: string;
	apiKeyID: string;
}

export class CKANAPIBase {
	BASE_CKAN_URL: string;
	BASE_CKAN_API_URL: string;
	API_KEY: string;
	API_KEY_ID: string;

	constructor(props: CKANAPIBaseProps) {
		this.BASE_CKAN_URL = props.ckanURL;
		this.BASE_CKAN_API_URL = props.ckanAPIURL;
		this.API_KEY = props.apiKey;
		this.API_KEY_ID = props.apiKeyID;
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
