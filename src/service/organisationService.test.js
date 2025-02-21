import Service from "./organisationService";
import { api_key, ckan_api_url } from "../../ckan.config.json";

const service = new Service(ckan_api_url, api_key);

test("organisation list", async () => {
	const res = await service.list({
		all_fields: true,
		include_users: true,
	});
	expect(res.success).toBeTruthy();

	const orgs = res.result;
	const users = orgs.reduce((acc, org) => {
		return [...acc, ...org.users];
	}, []);

	console.log(
		"count: ",
		users.length,
		", all capacity: ",
		users.every((el) => el.capacity)
	);
});
