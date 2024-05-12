import { CKANUserServiceInterface } from "../types";

class CKANUserService implements CKANUserServiceInterface {
	url: string;
	auth?: string | undefined;

	constructor(url: string, auth?: string) {
		this.url = url;
		this.auth = auth;
	}

	search() {}
	create() {}
	list() {}
	show() {}
	update() {}
	delete() {}
	autocomplete() {}
}

export default CKANUserService;
