import CKANPackage from "./ckanPackageService";
import config from "../../ckanTest.config.json";

const url = config.ckan_api_url;
const api = config.api_key;
const ckanPackage = new CKANPackage(url, api);

test("package list", async () => {
	const res = await ckanPackage.list();
	expect(res.success).toBeTruthy();
});
