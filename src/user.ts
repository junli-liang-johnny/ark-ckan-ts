import { CKANAPIBase, CKANAPIBaseProps } from "./";
import {
	CKANAPIResponse,
	CKANAPITokenRevokeProps,
	CKANAPIUserCreateProps,
	CKANAPIUserListResponse,
	CKANAPIUserhowProps,
	CKANAPIUserListProps,
	CKANAPIUserRemoveProps,
	CKANAPIUserShowResponse,
	CKANAPIUserTokenCreateProps,
	CKANAPIUserTokenCreateResponse,
	CKANAPIUserTokenProps,
	CKANAPIUserTokenResponse,
	CKANAPIUserUpdateProps,
} from "./types";

export class CKANUserService extends CKANAPIBase {
	constructor(props: CKANAPIBaseProps) {
		super(props);
	}

	get(
		type: "list" | "show" | "api_token_list",
		data: Partial<
			CKANAPIUserhowProps | CKANAPIUserListProps | CKANAPIUserTokenProps
		>
	): Promise<
		CKANAPIUserListResponse | CKANAPIUserShowResponse | CKANAPIUserTokenResponse
	> {
		return new Promise((resolve, reject) => {
			let url;

			if (type === "api_token_list")
				url = `${this.BASE_CKAN_API_URL}/api_token_list?${new URLSearchParams(
					data as any
				).toString()}`;
			else if (type === "show")
				url = `${this.BASE_CKAN_API_URL}/user_show?${new URLSearchParams(
					data as any
				).toString()}`;
			else
				url = `${this.BASE_CKAN_API_URL}/user_list?${new URLSearchParams(
					data as any
				).toString()}`;

			fetch(url, { headers: { Authorization: this.API_KEY } })
				.then((res) => res.json())
				.then((res) => {
					if (type === "list") return resolve(res as CKANAPIUserListResponse);
					else if (type === "show")
						return resolve(res as CKANAPIUserShowResponse);
					else return resolve(res as CKANAPIUserTokenResponse);
				})
				.catch((err) => {
					console.error("ckan - user - get - err: ", err);
					reject(err);
				});
		});
	}

	create(
		type: "user_create" | "api_token_create",
		data: CKANAPIUserCreateProps | CKANAPIUserTokenCreateProps
	): Promise<CKANAPIUserShowResponse | CKANAPIUserTokenCreateResponse> {
		return new Promise((resolve, reject) => {
			const formData = new FormData();
			Object.entries(data).forEach(([key, val]) => formData.append(key, val));

			let url;
			if (type === "user_create") url = `${this.BASE_CKAN_API_URL}/user_create`;
			else
				url = `${this.BASE_CKAN_API_URL}/api_token_create?${new URLSearchParams(
					data as any
				).toString()}`;

			fetch(url, {
				method: "POST",
				headers: {
					Authorization: this.API_KEY,
				},
				body: formData,
			})
				.then((res) => res.json())
				.then((res) => {
					if (type === "user_create") resolve(res as CKANAPIUserShowResponse);
					else resolve(res as CKANAPIUserTokenCreateResponse);
				})
				.catch((err) => {
					console.error("ckan - user - create - err: ", err);
					reject(err);
				});
		});
	}

	remove(
		type: "user_remove" | "api_token_revoke",
		data: CKANAPIUserRemoveProps | CKANAPITokenRevokeProps
	): Promise<CKANAPIResponse> {
		return new Promise((resolve, reject) => {
			let url;
			const formData = new FormData();

			if (type === "user_remove") {
				url = `${this.BASE_CKAN_API_URL}/user_delete?${new URLSearchParams(
					data as any
				).toString()}`;
				formData.append("id", (data as CKANAPIUserRemoveProps).id);
			} else {
				url = `${this.BASE_CKAN_API_URL}/api_token_revoke`;
				Object.entries(data).forEach(([key, val]) => formData.append(key, val));
			}

			fetch(url, {
				method: "POST",
				headers: {
					Authorization: this.API_KEY,
				},
				body: formData,
			})
				.then((res) => res.json())
				.then((res) => {
					console.log("ckan - user - remove: ", res);
					resolve(res);
				})
				.catch((err) => {
					console.error("ckan - user - remove - err: ", err);
					reject(err);
				});
		});
	}

	update(data: CKANAPIUserUpdateProps): Promise<CKANAPIUserShowResponse> {
		return new Promise((resolve, reject) => {
			const url = `${this.BASE_CKAN_API_URL}/user_update`;
			const formData = new FormData();
			Object.entries(data).forEach(([key, val]) => formData.append(key, val));

			fetch(url, {
				method: "POST",
				headers: {
					Authorization: this.API_KEY,
				},
				body: formData,
			})
				.then((res) => res.json())
				.then((res) => {
					console.log("ckan - user - update: ", res);
					resolve(res);
				})
				.catch((err) => {
					console.error("ckan - user - update - err: ", err);
					reject(err);
				});
		});
	}
}
