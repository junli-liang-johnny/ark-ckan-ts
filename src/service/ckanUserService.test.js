import CKANUserService from "./ckanUserService";
import CKANOrganisationService from "./organisationService";
import config from "../../ckan.config.json";
// import config from "../../ckanTest.config.json";

const url = config.ckan_api_url;
const api = config.api_key;
const service = new CKANUserService(url, api);
const orgService = new CKANOrganisationService(url, api);

jest.setTimeout(100000);

test("user list", async () => {
	const res = await service.list({
		all_fields: "true",
		order_by: "name",
	});

	const users = res.result
		.filter(
			(el) =>
				!el.sysadmin &&
				el.created.includes("2024") &&
				!el.email.includes("hse") &&
				!el.name.includes("haula")
		)
		.map((el) => ({ id: el.id, name: el.name, created: el.created }));
	console.log("users: ", users);
	expect(res.success).toBeTruthy();

	// const ids = users.map((el) => el.id);
	// const deleted = await Promise.all(ids.map((el) => service.delete(el)));
	// expect(deleted.every((el) => el)).toBeTruthy();

	// const orgRes = await service.list({
	// 	all_fields: true,
	// 	include_users: true,
	// });
	// expect(res.success).toBeTruthy();

	// const orgs = res.result;
	// const orgUsers = orgs
	// 	.reduce((acc, org) => {
	// 		if (org.users) {
	// 			return [...acc, ...org.users];
	// 		} else {
	// 			return acc;
	// 		}
	// 	}, [])
	// 	.map((el) => el.name);

	// const filtered = users.filter((el) => !orgUsers.includes(el));
	// console.log("filtered: ", filtered);
	// expect(filtered.length).toBeLessThan(0);

	// if (!allCapacity) {
	// 	const fakeUsers = users.filter((el) => !el.capacity);
	// 	const deleted = await Promise.all(
	// 		fakeUsers.map((el) => service.delete(el.id))
	// 	);
	// 	console.log("fakeUsers.length: ", fakeUsers.length);
	// 	expect(deleted.every((el) => el)).toBeTruthy();
	// }
});
