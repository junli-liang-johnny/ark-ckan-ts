import { CKANServiceInterface } from "../types";
declare class CKANService implements CKANServiceInterface {
    url: string;
    auth?: string | undefined;
    _headers: HeadersInit;
    constructor(url: string, auth?: string);
    show(data: any): Promise<unknown>;
    list(data: any): Promise<any>;
    search(data: any): Promise<unknown>;
    update(data: any): Promise<unknown>;
    autocomplete(data: any): Promise<unknown>;
    create(data: any): Promise<unknown>;
}
export default CKANService;
