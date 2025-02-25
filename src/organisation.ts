import { CKANAPIBase, CKANAPIBaseProps } from "./base";
import {
	CKANAPIGetListResponse,
	CKANAPIOrganisationGetListProps,
	CKANAPIOrganisationMemberCreateProps,
	CKANAPIOrganisationMemberCreateResponse,
	CKANAPIOrganisationShowResponse,
	CKANAPIOrganizationGetShowProps,
} from "./types";

export class CKANOrganisationService extends CKANAPIBase {
	constructor(props: CKANAPIBaseProps) {
		super(props);
	}

	get(
		type: "list" | "show",
		data: Partial<
			CKANAPIOrganisationGetListProps | CKANAPIOrganizationGetShowProps
		>
	): Promise<CKANAPIGetListResponse | CKANAPIOrganisationShowResponse> {
		return new Promise((resolve, reject) => {
			let url;

			if (type === "list")
				url = `${
					this.BASE_CKAN_API_URL
				}/organization_list?${new URLSearchParams(data as any).toString()}`;
			else
				url = `${
					this.BASE_CKAN_API_URL
				}/organization_show?${new URLSearchParams(data as any).toString()}`;

			fetch(url)
				.then((res) => res.json())
				.then((res) => {
					resolve(
						res as CKANAPIGetListResponse | CKANAPIOrganisationShowResponse
					);
				})
				.catch((err) => reject(err));
		});
	}

	create(
		type: "member_create",
		data: CKANAPIOrganisationMemberCreateProps
	): Promise<CKANAPIOrganisationMemberCreateResponse> {
		return new Promise((resolve, reject) => {
			let url;
			const formData = new FormData();
			Object.entries(data).forEach(([key, val]) => formData.append(key, val));

			if (type === "member_create")
				url = `${this.BASE_CKAN_API_URL}/organization_member_create`;
			else url = `${this.BASE_CKAN_API_URL}/organization_member_create`;

			fetch(url, {
				method: "POST",
				headers: { Authorization: this.API_KEY },
				body: formData,
			})
				.then((res) => res.json())
				.then((res) => {
					if (type === "member_create")
						return resolve(res as CKANAPIOrganisationMemberCreateResponse);

					resolve(res);
				})
				.catch((err) => reject(err));
		});
	}
}
