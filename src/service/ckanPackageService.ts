import { CKANPackageServiceInterface, CKANPackageListResponse } from "../types";

class CKANPackageService implements CKANPackageServiceInterface {
	url: string;
	auth?: string | undefined;

	constructor(url: string, auth?: string) {
		this.url = url;
		this.auth = auth;
	}

	show() {}

	list(data?: { limit?: number; offset?: number }) {
		return new Promise<CKANPackageListResponse>((resolve, reject) => {
			const headers = { Authorization: this.auth } as HeadersInit;
			const _data = Object.entries(data || {}).reduce((acc, [key, value]) => {
				return { ...acc, [key]: String(value) };
			}, {});
			const _url = `${this.url}/package_list?${new URLSearchParams(
				_data
			).toString()}`;

			fetch(_url, {
				method: "GET",
				headers,
			})
				.then((res) => {
					if (res.ok) return res.json();
					else {
						console.error("Failed to fetch, res: ", res.statusText);
						return reject(res.statusText);
					}
				})
				.then((res: CKANPackageListResponse) => {
					return resolve(res);
				})
				.catch((err) => {
					console.error("ckan - package - list - err: ", err);
					reject(err as string);
				});
		});
	}

	search() {}

	update() {}

	autocomplete() {}
	create() {}
}

export default CKANPackageService;
