import { CKANAPIBase, CKANAPIBaseProps } from "./base";
import {
	CKANAPIGetListResponse,
	CKANAPIHeaders,
	CKANAPIAction,
	CKANAPIGetServiceResponse,
	CKANAPIPackageAutocompleteResponse,
	CKANAPIPackageCreateProps,
	CKANAPIPackageListProps,
	CKANAPIPackageSearchProps,
	CKANAPIPackageSearchResponse,
	CKANAPIPackageShowProps,
	CKANAPIPackageShowResponse,
	CKANAPIPackageUpdateProps,
} from "./types";

type ReturnType =
	| CKANAPIGetListResponse
	| CKANAPIPackageShowResponse
	| CKANAPIPackageSearchResponse
	| CKANAPIPackageAutocompleteResponse;

export class CKANPackageService extends CKANAPIBase {
	constructor(props: CKANAPIBaseProps) {
		super(props);
	}

	dcatDatasetURL(id: string) {
		return `${this.BASE_CKAN_URL}/dataset/${id}`;
	}

	isDcatDatasetURL = (id: string | undefined) => {
		if (!id) return false;
		return id.includes("dataset") && !id.includes("resource");
	};

	get = <T extends ReturnType>(
		action: CKANAPIAction,
		data: Partial<
			| CKANAPIPackageShowProps
			| CKANAPIPackageListProps
			| CKANAPIPackageSearchProps
		>,
		headers?: CKANAPIHeaders
	): Promise<CKANAPIGetServiceResponse<T>> => {
		return new Promise((resolve, reject) => {
			console.log("ckan package - get - data: ", data, ", headers: ", headers);

			const url = this.createGetURL(action, data);

			fetch(url, {
				headers: {
					Authorization: headers?.Authorization || this.API_KEY,
				},
			})
				.then((res) => res.json())
				.then((res) => {
					return resolve(res as CKANAPIGetServiceResponse<T>);
				})
				.catch((err) => {
					console.error("ckan - package - get - err: ", err);
					reject(err);
				});
		});
	};

	create(data: CKANAPIPackageCreateProps): Promise<CKANAPIPackageShowResponse> {
		return new Promise((resolve, reject) => {
			const url = `${this.BASE_CKAN_API_URL}/package_create`;
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
					return resolve(res as CKANAPIPackageShowResponse);
				})
				.catch((err) => {
					console.error("ckan - package - create - err: ", err);
					reject(err);
				});
		});
	}

	update(data: CKANAPIPackageUpdateProps): Promise<CKANAPIPackageShowResponse> {
		return new Promise((resolve, reject) => {
			const url = `${this.BASE_CKAN_API_URL}/package_update`;

			fetch(url, {
				method: "POST",
				headers: {
					Authorization: this.API_KEY,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
				.then((res) => res.json())
				.then((res) => {
					return resolve(res as CKANAPIPackageShowResponse);
				})
				.catch((err) => {
					console.error("ckan - package - create - err: ", err);
					reject(err);
				});
		});
	}
	createGetURL = (action: CKANAPIAction, data: any) => {
		let url: string;
		if (action === "search")
			url = `${this.BASE_CKAN_API_URL}/package_search?${new URLSearchParams(
				data as any
			).toString()}`;
		else if (action === "show")
			url = `${this.BASE_CKAN_API_URL}/package_show?${new URLSearchParams(
				data as any
			).toString()}`;
		else if (action === "autocomplete")
			url = `${
				this.BASE_CKAN_API_URL
			}/package_autocomplete?${new URLSearchParams(data as any).toString()}`;
		else
			url = `${this.BASE_CKAN_API_URL}/package_list?${new URLSearchParams(
				data as any
			).toString()}`;

		return url;
	};
}
