import { CKANServiceInterface } from "../types";

class CKANService implements CKANServiceInterface {
	url: string;
	auth?: string | undefined;
	_headers: HeadersInit;

	constructor(url: string, auth?: string) {
		this.url = url;
		this.auth = auth;
		this._headers = { Authorization: this.auth } as HeadersInit;
	}

	show(data: any) {
		return new Promise((resolve, reject) => {});
	}
	list(data: any): Promise<any> {
		return new Promise((resolve, reject) => {});
	}
	search(data: any) {
		return new Promise((resolve, reject) => {});
	}
	update(data: any) {
		return new Promise((resolve, reject) => {});
	}
	autocomplete(data: any) {
		return new Promise((resolve, reject) => {});
	}
	create(data: any) {
		return new Promise((resolve, reject) => {});
	}
}

export default CKANService;
