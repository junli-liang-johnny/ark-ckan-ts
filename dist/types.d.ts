export interface CKANAPIResponse {
    help: string;
    error?: {
        id: string[];
    };
    success: boolean;
}
export declare type CKANAPIAction = 'show' | 'list' | 'search' | 'autocomplete';
export declare type CKANAPIGetServiceResponse<T> = T;
export interface CKANAPIGetListResponse extends CKANAPIResponse {
    result: string[];
}
export interface CKANAPIShowResponse extends CKANAPIResponse {
    result: Object;
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
    approval_status: 'approved' | string;
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
export declare type CKANAPIUser = {
    about: null;
    activity_streams_email_notifications: boolean;
    capacity: CKANAPICapacity;
    created: string;
    display_name: string;
    email_hash: string;
    fullname: string;
    id: string;
    image_display_url?: string;
    image_url?: string;
    name: string;
    number_created_packages: number;
    state: 'arkp:active' | string;
    sysadmin: boolean;
    datasets?: CKANAPIPackage[];
    num_followers?: number;
};
export declare type CKANAPICapacity = 'member' | 'editor' | 'admin' | 'public' | 'private' | 'None';
export declare type CKANAPIType = 'dataset' | 'group' | 'organization';
export declare type CKANRoleCapacity = 'admin' | 'member' | 'editor';
export declare type CKANAPIState = 'active' | 'deleted';
export declare type CKANAPIPackage = {
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
export declare type CKANAPIResource = {
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
    url_type: 'upload' | string;
};
export declare type CKANAPIRelationship = {
    subject: string;
    object: string;
    type: 'depends_on' | 'dependency_of' | 'derives_from' | 'has_derivation' | 'links_to' | 'linked_from' | 'child_of' | 'parent_of';
    comment: string;
};
export declare type CKANAPIGroup = {
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
export declare type CKANAPITag = {
    display_name: string;
    id: string;
    name: string;
    state: string;
    vocabulary_id: string;
};
export declare type CKANAPIExtra = {
    key: string;
    vakue: string;
};
export declare type CKANAPIToken = {
    id: string;
    name: string;
    user_id: string;
    created_at: string;
    last_access: string | null;
};
export declare type CKANAPIHeaders = {
    Authorization?: string | undefined | null;
};
export interface CKANAPIPackageListProps {
    limit: number;
    offset: number;
}
export declare type CKANAPIPackageShowProps = {
    id: string;
    use_default_schema: boolean;
    include_tracking: boolean;
};
export interface CKANAPIPackageShowResponse extends CKANAPIShowResponse {
    result: CKANAPIPackage;
}
export declare type CKANAPIPackageAutocompleteItem = {
    name: string;
    title: string;
    match_field: string;
    match_displayed: string;
};
export interface CKANAPIPackageAutocompleteResponse extends CKANAPIShowResponse {
    result: CKANAPIPackageAutocompleteItem[];
}
export interface CKANAPIPackageSearchProps {
    q: string;
    fq: string;
    fq_list: string;
    sort: string;
    rows: number;
    start: number;
    facet: string;
    'facet.mincount': number;
    'facet.limit': number;
    'facet.field': string[];
    'include_drafts': boolean;
    'include_private': boolean;
    'use_default_schema': boolean;
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
export interface CKANAPIPackageCreateProps extends Partial<Omit<CKANAPIPackage, 'resources'>> {
    name: string;
    title: string;
    private: boolean;
    resources?: Partial<CKANAPIResourceCreateProps>[];
}
export interface CKANAPIPackageUpdateProps extends Partial<CKANAPIPackageCreateProps> {
    id: string;
}
export interface CKANAPIResourceShowProps {
    id: string;
    include_tracking?: boolean;
}
export interface CKANAPIResourceShowResponse extends CKANAPIShowResponse {
    result: CKANAPIResource;
}
export interface CKANAPIResourceSearchProps {
    query: string | string[];
    fields: object;
    order_by: string;
    offset: number;
    limit: number;
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
    package_id: string;
    url: string;
    upload?: File;
}
export interface CKANAPIResourceUpdateProps extends Partial<CKANAPIResourceCreateProps> {
    id: string;
}
export interface CKANAPIGroupGetListProps {
    order_by: 'name' | 'packages';
    sort: 'title asc' | 'name' | 'package_count' | 'title';
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
        approval_status: 'approved' | string;
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
        state: 'arkp:active' | string;
        title: string;
        type: CKANAPIType;
        extras: string[];
        tags: string[];
        groups: string[];
        users: string[];
    };
}
export interface CKANAPIUserListProps {
    q: string;
    email: string;
    order_by: 'id' | 'name' | 'fullname' | 'display_name' | 'created' | 'about' | 'sysadmin' | 'number_created_packages';
    all_fields: boolean;
}
export interface CKANAPIUserhowProps {
    id: string;
    user_obj: CKANAPIUser;
    include_datasets: boolean;
    include_num_followers: boolean;
    include_password_hash: boolean;
    include_plugin_extras: boolean;
}
export interface CKANAPIUserTokenProps {
    user: string;
}
export interface CKANAPIUserTokenCreateProps {
    user: string;
    name: string;
}
export interface CKANAPITokenRevokeProps {
    token?: string;
    jti?: string;
}
export interface CKANAPIUserRemoveProps {
    id: string;
}
export interface CKANAPIUserGetResponse extends Omit<CKANAPIGetListResponse, 'result'> {
    result: CKANAPIUser[];
}
export interface CKANAPIUserShowResponse extends CKANAPIShowResponse {
    result: CKANAPIUser;
}
export interface CKANAPIUserTokenResponse extends CKANAPIResponse {
    result: CKANAPIToken[];
}
export interface CKANAPIUserTokenCreateResponse extends CKANAPIResponse {
    result: {
        token: string;
    };
}
export interface CKANAPIUserCreateProps {
    name: string;
    email: string;
    password: string;
    id?: string;
    fullname?: string;
    about?: string;
    image_url?: string;
    plugin_extras?: object;
}
export interface CKANAPIUserUpdateProps {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    fullname?: string;
    about?: string;
    image_url?: string;
    plugin_extras?: object;
}
export interface CKANAPIOrganisationGetListProps {
    order_by: 'name' | 'packages';
    sort: 'title asc' | 'name' | 'package_count' | 'title';
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
    id: string;
    username: string;
    role: CKANRoleCapacity;
}
export interface CKANAPIOrganisationMemberCreateResponse extends CKANAPIResponse {
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
