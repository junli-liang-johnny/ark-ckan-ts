import {
	CKANAPIOrganisationGetListProps,
	CKANOrganisationListResponse,
} from "../types";
import CKANService from "./ckanService";

class CKANOrganisationService extends CKANService {
	constructor(url: string, auth?: string) {
		super(url, auth);
	}

	// search() {}

	// create() {}

	list(data: CKANAPIOrganisationGetListProps) {
		return new Promise<CKANOrganisationListResponse>((resolve, reject) => {
			const _data = Object.entries(data || {}).reduce((acc, [key, value]) => {
				return { ...acc, [key]: String(value) };
			}, {});
			const _url = `${this.url}/organization_list?${new URLSearchParams(
				_data
			).toString()}`;
			fetch(_url, {
				method: "GET",
				headers: this._headers,
			})
				.then((res) => {
					if (res.ok) return res.json();
					else {
						console.error(
							"CKANOrganisationService - Failed to fetch, res: ",
							res.statusText
						);
						return res.json();
					}
				})
				.then((res: CKANOrganisationListResponse) => {
					if (res.success) return resolve(res);
					else {
						console.error(
							"CKANOrganisationService - CKANUserService - list - Failed to fetch, res: ",
							res.error
						);
						return reject(res.error);
					}
				});
		});
	}
	// show() {}

	// update() {}

	// delete() {}

	// autocomplete() {}
}

export default CKANOrganisationService;
