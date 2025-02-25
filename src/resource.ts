import { CKANAPIBase, CKANAPIBaseProps } from "./base";
import {
	CKANAPIHeaders,
	CKANAPIAction,
	CKANAPIGetServiceResponse,
	CKANAPIResourceCreateProps,
	CKANAPIResourceSearchProps,
	CKANAPIResourceSearchResponse,
	CKANAPIResourceShowProps,
	CKANAPIResourceShowResponse,
	CKANAPIResourceUpdateProps,
} from "./types";

type ReturnType = CKANAPIResourceShowResponse | CKANAPIResourceSearchResponse;

export class CKANResourceService extends CKANAPIBase {
	constructor(props: CKANAPIBaseProps) {
		super(props);
	}

	dcatDistributionURL(datasetId: string, resourceId: string) {
		return `${this.BASE_CKAN_URL}/dataset/${datasetId}/resource/${resourceId}`;
	}

	static isDcatDistributionURL = (id: string | undefined) => {
		if (!id) return false;
		return id.includes("resource") && id.includes("dataset");
	};

	static extractPackageId = (id: string) => {
		const split = id.split("/");
		const packageIndex = split.indexOf("dataset");
		return split[packageIndex + 1];
	};

	get<T extends ReturnType>(
		action: CKANAPIAction,
		data: Partial<CKANAPIResourceShowProps & CKANAPIResourceSearchProps>,
		headers?: CKANAPIHeaders
	): Promise<CKANAPIGetServiceResponse<T>> {
		return new Promise((resolve, reject) => {
			let url;

			if (action === "search")
				url = `${this.BASE_CKAN_API_URL}/resource_search?${new URLSearchParams(
					data as any
				).toString()}`;
			else if (action === "show")
				url = `${this.BASE_CKAN_API_URL}/resource_show?${new URLSearchParams(
					data as any
				).toString()}`;
			else
				url = `${this.BASE_CKAN_API_URL}/resource_show?${new URLSearchParams(
					data as any
				).toString()}`;

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
					console.error("ckan - resource - get - err: ", err);
					reject(err);
				});
		});
	}

	// upload not working on nodejs
	create(
		data: CKANAPIResourceCreateProps
	): Promise<CKANAPIResourceShowResponse> {
		return new Promise((resolve, reject) => {
			const url = `${this.BASE_CKAN_API_URL}/resource_create`;
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
					console.log("ckan - resource - create - res: ", res);
					return resolve(res as CKANAPIResourceShowResponse);
				})
				.catch((err) => {
					console.error("ckan - resource - create - err: ", err);
					reject(err);
				});
		});
	}

	update(
		data: CKANAPIResourceUpdateProps
	): Promise<CKANAPIResourceShowResponse> {
		return new Promise((resolve, reject) => {
			const url = `${this.BASE_CKAN_API_URL}/resource_update`;
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
					console.log("ckan - resource - create - res: ", res);
					return resolve(res as CKANAPIResourceShowResponse);
				})
				.catch((err) => {
					console.error("ckan - resource - create - err: ", err);
					reject(err);
				});
		});
	}
}
