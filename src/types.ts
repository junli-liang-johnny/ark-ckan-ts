export interface CKANAPIResponse {
	help: string;
	error?: { id: string[] };
	success: boolean;
}

export type CKANAPIAction = "show" | "list" | "search" | "autocomplete";

export type CKANAPIGetServiceResponse<T> = T;

export interface CKANAPIGetListResponse extends CKANAPIResponse {
	result: string[];
}

export interface CKANAPIShowResponse extends CKANAPIResponse {
	result: Object;
}

interface CKANAPIListResponse<T> extends CKANAPIResponse {
	result: T[];
}

export interface CKANAPIOrganisation {
	id: string;
	name: string;
	title: string;
	type: string;
	description: string;
	image_url: string;
	created: string;
	is_organization: boolean;
	approval_status: "approved" | string;
	state: CKANAPIState;
	display_name: string;
	image_display_url: string;
	num_followers: number;
	package_count: number;
	users: CKANAPIUser[];
	extras: CKANAPIExtra[];
	tags: CKANAPITag[];
	groups: [];
}

export type CKANAPIUser = {
	about: null;
	activity_streams_email_notifications: boolean;
	capacity: CKANAPICapacity;
	created: string;
	display_name: string;
	email_hash: string;
	email: string;
	fullname: string;
	id: string;
	image_display_url?: string;
	image_url?: string;
	name: string;
	number_created_packages: number;
	state: "arkp:active" | string;
	sysadmin: boolean;
	datasets?: CKANAPIPackage[];
	num_followers?: number;
};

export type CKANAPICapacity =
	| "member"
	| "editor"
	| "admin"
	| "public"
	| "private"
	| "None";

export type CKANAPIType = "dataset" | "group" | "organization";

export type CKANRoleCapacity = "admin" | "member" | "editor";

export type CKANAPIState = "active" | "deleted";

export type CKANAPIPackage = {
	author?: string;
	author_email?: string;
	creator_user_id: string;
	id: string;
	isopen: boolean;
	license_id: string;
	license_title: string;
	maintainer: string;
	maintainer_email: string;
	metadata_created: string;
	metadata_modified: string;
	name: string;
	notes: string;
	num_resources: number;
	num_tags: number;
	organization: CKANAPIOrganisation;
	owner_org: string;
	private: boolean;
	state: CKANAPIState;
	title: string;
	type: CKANAPIType;
	url: string;
	version: string;
	resources: CKANAPIResource[];
	tags: CKANAPITag[];
	extras: CKANAPIExtra[];
	groups: CKANAPIGroup[];
	relationships_as_subject: CKANAPIRelationship[];
	relationships_as_object: CKANAPIRelationship[];
};

export type CKANAPIResource = {
	cache_last_updated: string;
	cache_url: string;
	created: string;
	datastore_active: string;
	description: string;
	format: string;
	hash: string;
	id: string;
	last_modified: string;
	metadata_modified: string;
	mimetype: string;
	mimetype_inner: string;
	name: string;
	package_id: string;
	position: number;
	resource_type: string;
	size: number;
	state: CKANAPIState;
	url: string;
	url_type: "upload" | string;
};

export type CKANAPIRelationship = {
	subject: string; // (string) – the id or name of the dataset that is the subject of the relationship
	object: string; // – the id or name of the dataset that is the object of the relationship
	type:
		| "depends_on"
		| "dependency_of"
		| "derives_from"
		| "has_derivation"
		| "links_to"
		| "linked_from"
		| "child_of"
		| "parent_of"; // (string) – the type of the relationship, one of 'depends_on', 'dependency_of', 'derives_from', 'has_derivation', 'links_to', 'linked_from', 'child_of' or 'parent_of'
	comment: string; //(string) – a comment about the relationship(optional)
};

export type CKANAPIGroup = {
	about: null;
	activity_streams_email_notifications: false;
	capacity: CKANAPICapacity;
	created: string;
	display_name: string;
	email_hash: string;
	fullname: null;
	id: string;
	image_display_url: null;
	image_url: null;
	name: string;
	number_created_packages: number;
	state: CKANAPIState;
	sysadmin: boolean;
};

export type CKANAPITag = {
	display_name: string;
	id: string;
	name: string;
	state: string;
	vocabulary_id: string;
};

export type CKANAPIExtra = {
	key: string;
	vakue: string;
};

export type CKANAPIToken = {
	id: string;
	name: string;
	user_id: string;
	created_at: string;
	last_access: string | null;
};

export type CKANAPIHeaders = {
	Authorization?: string | undefined | null;
};

export interface CKANAPIPackageListProps {
	limit: number;
	offset: number;
}

export type CKANAPIPackageShowProps = {
	id: string;
	use_default_schema: boolean;
	include_tracking: boolean;
};

export interface CKANAPIPackageShowResponse extends CKANAPIShowResponse {
	result: CKANAPIPackage;
}

export type CKANAPIPackageAutocompleteItem = {
	name: string;
	title: string;
	match_field: string;
	match_displayed: string;
};

export interface CKANAPIPackageAutocompleteResponse
	extends CKANAPIShowResponse {
	result: CKANAPIPackageAutocompleteItem[];
}

export interface CKANAPIPackageSearchProps {
	q: string;
	fq: string; // any filter queries to apply. Note: +site_id:{ckan_site_id} is added to this string prior to the query being executed.
	fq_list: string; //
	sort: string; // – sorting of the search results.Optional.Default: 'score desc, metadata_modified desc'.As per the solr documentation, this is a comma - separated string of field names and sort - orderings.      rows(int) – the maximum number of matching rows(datasets) to return. (optional, default: 10, upper limit: 1000 unless set in site’s configuration ckan.search.rows_max)
	rows: number; // (int) – the maximum number of matching rows(datasets) to return. (optional, default: 10, upper limit: 1000 unless set in site’s configuration ckan.search.rows_max)
	start: number; // – the offset in the complete result for where the set of returned datasets should begin.
	facet: string; // – whether to enable faceted results.Default: True.
	"facet.mincount": number; //(int) – the minimum counts for facet fields should be included in the results.
	"facet.limit": number; // – the maximum number of values the facet fields return.A negative value means unlimited.This can be set instance - wide with the search.facets.limit config option.Default is 50.
	"facet.field": string[]; // – the fields to facet upon.Default empty.If empty, then the returned facet information is empty.
	include_drafts: boolean; // (bool) – if True, draft datasets will be included in the results.A user will only be returned their own draft datasets, and a sysadmin will be returned all draft datasets.Optional, the default is False.
	include_private: boolean; //(bool) – if True, private datasets will be included in the results.Only private datasets from the user’s organizations will be returned and sysadmins will be returned all private datasets.Optional, the default is False.
	use_default_schema: boolean; //(bool) – use default package schema instead of a custom schema defined with an IDatasetForm plugin(default: False)
}

export interface CKANAPIPackageSearchResponse extends CKANAPIResponse {
	result: {
		count: number;
		facets: object;
		results: CKANAPIPackage[];
		sort: string;
		search_facets: object;
	};
}

export interface CKANAPIPackageCreateProps
	extends Partial<Omit<CKANAPIPackage, "resources">> {
	name: string; // (string) – the name of the new dataset, must be between 2 and 100 characters long and contain only lowercase alphanumeric characters, - and _, e.g. 'warandpeace'
	title: string; // (string) – the title of the dataset(optional, default: same as name)
	private: boolean; // (bool) – If True creates a private dataset
	resources?: Partial<CKANAPIResourceCreateProps>[]; // (list of resource dictionaries) – the dataset’s resources, see resource_create() for the format of resource dictionaries(optional)
}

export interface CKANAPIPackageUpdateProps
	extends Partial<CKANAPIPackageCreateProps> {
	id: string;
}

export interface CKANAPIResourceShowProps {
	id: string; //(string) – the id of the resource
	include_tracking?: boolean; //(bool) – add tracking information to dataset and resources(default: False)
}

export interface CKANAPIResourceShowResponse extends CKANAPIShowResponse {
	result: CKANAPIResource;
}

export interface CKANAPIResourceSearchProps {
	query: string | string[]; //(string or list of strings of the form { field }: { term1 }) – The search criteria.See above for description.
	fields: object; //(dict of fields to search terms.) – Deprecated
	order_by: string; // (string) – A field on the Resource model that orders the results.
	offset: number; //(int) – Apply an offset to the query.
	limit: number; // (int) – Apply a limit to the query.
}

export interface CKANAPIResourceSearchResponse extends CKANAPIResponse {
	result: {
		count: number;
		facets: object;
		results: CKANAPIResource[];
		sort: string;
		search_facets: object;
	};
}

export interface CKANAPIResourceCreateProps extends Partial<CKANAPIResource> {
	package_id: string; //(string) – id of package that the resource should be added to.
	url: string; // (string) – url of resource
	upload?: File; // (FieldStorage(optional) needs multipart / form - data) – (optional)
}

export interface CKANAPIResourceUpdateProps
	extends Partial<CKANAPIResourceCreateProps> {
	id: string;
}

export interface CKANAPIGroupGetListProps {
	order_by: "name" | "packages";
	sort: "title asc" | "name" | "package_count" | "title";
	limit: number;
	offset: number;
	groups: string[];
	all_fields: boolean;
	include_dataset_count: boolean;
	include_extras: boolean;
	include_tags: boolean;
	include_groups: boolean;
	include_users: boolean;
}

export interface CKANAPIGroupGetShowProps {
	id: string;
	include_datasets: boolean;
	include_dataset_count: boolean;
	include_extras: boolean;
	include_users: boolean;
	include_groups: boolean;
	include_tags: boolean;
	include_followers: boolean;
}

export interface CKANAPIGroupShowResponse extends CKANAPIShowResponse {
	result: {
		approval_status: "approved" | string;
		created: string;
		description: string;
		display_name: string;
		id: string;
		image_display_url: string;
		image_url: string;
		is_organization: boolean;
		name: string;
		num_followers: number;
		package_count: number;
		state: "arkp:active" | string;
		title: string;
		type: CKANAPIType;
		extras: string[];
		tags: string[];
		groups: string[];
		users: string[];
	};
}

export interface CKANAPIUserListProps {
	q: string; // (string) – filter the users returned to those whose names contain a string(optional)
	email: string; //(string) – filter the users returned to those whose email match a string(optional)(you must be a sysadmin to use this filter)
	order_by:
		| "id"
		| "name"
		| "fullname"
		| "display_name"
		| "created"
		| "about"
		| "sysadmin"
		| "number_created_packages"; // (string) – which field to sort the list by(optional, default: 'display_name').Users can be sorted by 'id', 'name', 'fullname', 'display_name', 'created', 'about', 'sysadmin' or 'number_created_packages'.
	all_fields: boolean; // (bool) – return full user dictionaries instead of just names. (optional, default: True)
}

export interface CKANAPIUserhowProps {
	id: string; //(string) – the id or name of the user(optional)
	user_obj: Partial<CKANAPIUser>; //(user dictionary) – the user dictionary of the user(optional)
	include_datasets: boolean; //(bool) – Include a list of datasets the user has created.If it is the same user or a sysadmin requesting, it includes datasets that are draft or private. (optional, default: False, limit: 50)
	include_num_followers: boolean; //(bool) – Include the number of followers the user has(optional, default: False)
	include_password_hash: boolean; //(bool) – Include the stored password hash(sysadmin only, optional, default: False)
	include_plugin_extras: boolean; //(bool) – Include the internal plugin extras object(sysadmin only, optional, default: False)
}

export interface CKANAPIUserTokenProps {
	user: string; // string - the id or name of the user
}

export interface CKANAPIUserTokenCreateProps {
	user: string; // (string) – name or id of the user who owns new API Token
	name: string; // (string) – distinctive name for API Token
}

export interface CKANAPITokenRevokeProps {
	token?: string; // (string) – Token to remove(required if jti not specified).
	jti?: string; // (string) – Id of the token to remove(overrides token if specified).
}

export interface CKANAPIUserRemoveProps {
	id: string;
}

export interface CKANAPIUserListResponse
	extends Omit<CKANAPIGetListResponse, "result"> {
	result: CKANAPIUser[];
}

export interface CKANAPIUserShowResponse extends CKANAPIShowResponse {
	result: CKANAPIUser;
}

export interface CKANAPIUserTokenResponse extends CKANAPIResponse {
	result: CKANAPIToken[];
}

export interface CKANAPIUserTokenCreateResponse extends CKANAPIResponse {
	result: { token: string };
}

export interface CKANAPIUserCreateProps {
	name: string; //(string) – the name of the new user, a string between 2 and 100 characters in length, containing only lowercase alphanumeric characters, - and _
	email: string; //(string) – the email address for the new user
	password: string; // (string) – the password of the new user, a string of at least 4 characters
	id?: string; //(string) – the id of the new user(optional)
	fullname?: string; //(string) – the full name of the new user(optional)
	about?: string; // (string) – a description of the new user(optional)
	image_url?: string; // (string) – the URL to an image to be displayed on the group’s page(optional)
	plugin_extras?: object; //(dict) – private extra user data belonging to plugins.Only sysadmin users may set this value.It should be a dict that can be dumped into JSON, and plugins should namespace their extras with the plugin name to avoid collisions with other plugins, eg:
}

export interface CKANAPIUserUpdateProps {
	id: string; //(string) – the id of the new user(optional)
	name?: string;
	email?: string; //(string) – the email address for the new user
	password?: string; // (string) – the password of the new user, a string of at least 4 characters
	fullname?: string; //(string) – the full name of the new user(optional)
	about?: string; // (string) – a description of the new user(optional)
	image_url?: string; // (string) – the URL to an image to be displayed on the group’s page(optional)
	plugin_extras?: object; //(dict) – private extra user data belonging to plugins.Only sysadmin users may set this value.It should be a dict that can be dumped into JSON, and plugins should namespace their extras with the plugin name to avoid collisions with other plugins, eg:
}

export interface CKANAPIOrganisationGetListProps {
	order_by: "name" | "packages";
	sort: "title asc" | "name" | "package_count" | "title";
	limit: number;
	offset: number;
	organizations: string[];
	all_fields: boolean;
	include_dataset_count: boolean;
	include_extras: boolean;
	include_tags: boolean;
	include_groups: boolean;
	include_users: boolean;
}

export interface CKANAPIOrganizationGetShowProps {
	id: string;
	include_datasets: boolean;
	include_dataset_count: boolean;
	include_extras: boolean;
	include_users: boolean;
	include_groups: boolean;
	include_tags: boolean;
	include_followers: boolean;
}

export interface CKANAPIOrganisationMemberCreateProps {
	id: string; // (string) – the id or name of the organization
	username: string; // (string) – name or id of the user to be made member of the organization
	role: CKANRoleCapacity; // (string) – role of the user in the organization.One of member, editor, or admin
}

export interface CKANAPIOrganisationMemberCreateResponse
	extends CKANAPIResponse {
	result: {
		id: string;
		table_name: string;
		table_id: string;
		capacity: CKANRoleCapacity;
		group_id: string;
		state: string;
	};
}

export interface CKANAPIOrganisationShowResponse extends CKANAPIShowResponse {
	result: CKANAPIOrganisation;
}

// version 2
export interface CKANServiceInterface {
	url: string;
	_headers: HeadersInit;
	auth?: string;
	create: Function;
	show: Function;
	list: Function;
	update: Function;
	autocomplete: Function;
}

// package interfaces
export interface CKANPackageServiceInterface extends CKANServiceInterface {
	search: Function;
}

export interface CKANPackageListResponse extends CKANAPIGetListResponse {}

// user interface
export interface CKANUserServiceInterface extends CKANServiceInterface {
	delete: Function;
}

// organisation interface
export interface CKANOrganisationListResponse
	extends CKANAPIListResponse<CKANAPIOrganisation> {}
