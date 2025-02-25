import { CKANAPIUserListProps, CKANAPIUserListResponse } from "../types";
import CKANService from "./ckanService";

class CKANUserService extends CKANService {
	constructor(url: string, auth?: string) {
		super(url, auth);
	}

	// search() {}
	// create() {}
	list(data: CKANAPIUserListProps) {
		return new Promise<CKANAPIUserListResponse>((resolve, reject) => {
			const _data = Object.entries(data || {}).reduce((acc, [key, value]) => {
				return { ...acc, [key]: String(value) };
			}, {});
			const _url = `${this.url}/user_list?${new URLSearchParams(
				_data
			).toString()}`;
			fetch(_url, {
				headers: this._headers,
			})
				.then((res) => {
					if (res.ok) return res.json();
					else {
						console.error("Failed to fetch, res: ", res.statusText);
						return res.json();
					}
				})
				.then((res: CKANAPIUserListResponse) => {
					if (res.success) return resolve(res);
					else {
						console.error(
							"CKANUserService - list - Failed to fetch, res: ",
							res.error
						);
						return reject(res.error);
					}
				});
		});
	}
	// show() {}
	// update() {}
	delete(id: string) {
		return new Promise<boolean>((resolve, reject) => {
			const _url = this.url + "/delete";

			fetch(_url, {
				method: "POST",
				headers: this._headers,
				body: JSON.stringify({ id: id }),
			}).then((res) => {
				if (res.ok) return resolve(true);
				else {
					console.error("UserService - delete - Failed to fetch, res: ", res);
					return reject(res.statusText);
				}
			});
		});
	}
	// autocomplete() {}
}

export default CKANUserService;
