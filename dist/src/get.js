"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import fetch from "node-fetch";
// import FormData from "form-data";
// import { CKANAPIBase } from "./base";
var base_1 = require("./base");
// import { CKANPackageService } from "./package";
// import { CKANResourceService } from "./resource";
var url = "https://ark-evidence.adaptcentre.ie/api/action";
// const url = 'https://demo.ckan.org/api/action';
// const formData = new FormData();
// create resource
// const filePath = (path: string) => __dirname + '/' + path;
// const stats1 = fs.statSync(filePath('foo.csv'));
// const stats2 = fs.statSync(filePath('bar.csv'));
// const size = stats1.size + stats2.size;
// const upload1 = fs.createReadStream(filePath('foo.csv'));
// const upload2 = fs.createReadStream(filePath('bar.csv'));
// const upload1 = fs.readFileSync(filePath('foo.csv'));
// const upload2 = fs.readFileSync(filePath('bar.csv'), 'utf8');
// console.log('upload1: ', upload1);
// formData.append('package_id', '7581a1b4-10b1-43bb-b447-0c35215f4e14');
// formData.append('description', 'this is a csv file uploaded from node');
// formData.append('name', 'foobar from node');
// formData.append('size', stats1.size);
// formData.append('format', 'csv');
// formData.append('url', 'https://docs.google.com/document/d/1IV2L0IdjM3PLSv_oPjJM30GOWeSweVk1YyNl8Fk2kmM/edit');
// formData.append('upload', upload1);
// formData.append('upload', JSON.stringify([upload1, upload2]));
// create user
// formData.append('id', 'junli');
// formData.append('name', 'junli');
// formData.append('email', 'diaopkaique@gmail.com');
// formData.append('password', '19931214');
// create organisation member
// formData.append('id', 'trinity-college-dublin');
// formData.append('username', 'tcduser');
// formData.append('role', 'member');
// create user api token
// formData.append('user', 'testuser');
// formData.append('name', 'ark-evidence');
var apiToken = "";
// fetch(url + '/group_show?id=se-opengov')
// fetch('https://demo.ckan.org/api/3/action/group_show?id=test-group')
// fetch('https://demo.ckan.org/api/3/action/group_list')
// fetch(url + '/package_show?id=', { headers: { 'Authorization': CKANAPIBase.API_KEY } })
// fetch(url + '/package_show?id=ark-ui-design', { headers: { 'Authorization': "tYrilv0SAgqtxUL19EOHcGcLzi9TcIq5fu-sGuKpw2-jLtUV_nLllbsWC0q-A-ZbeaTzew41ZyOVuE0-" } })
// fetch(url + '/package_show?id=e89d59e8-6665-49b9-b431-d2adcea2dba3', { headers: { 'Authorization': CKANAPIBase.API_KEY } })
// fetch(url + '/package_show?id=9a42f4e8-0bb3-42db-bf99-2a2a3f33ff0b', { headers: { 'Authorization': CKANAPIBase.API_KEY } })
// fetch(url + "/package_list", { headers: { Authorization: apiToken } })
// fetch(url + "/package_list", {
// 	headers: { Authorization: CKANAPIBase.API_KEY },
// })
// 	.then((res) => res.json())
// 	.then((res) => console.log("res: ", res));
// fetch(url + '/member_list?id=ukgov')
// fetch(url + '/organization_show?id=trinity-college-dublin&include_users=true')
// fetch(url + '/organization_show?id=st-james-hospital&include_users=true')
// fetch(url + "/organization_list?all_fields=true")
// 	.then((res) => res.json())
// 	.then((res) => {
// 		console.log("res: ", res);
// 	});
// fetch(url + '/package_search?include_private=true&q=', { 'headers': { 'Authorization': CKANAPIBase.API_KEY } }) // search package with organisation
// fetch(url + '/package_search?', { 'headers': { 'Authorization': "tYrilv0SAgqtxUL19EOHcGcLzi9TcIq5fu-sGuKpw2-jLtUV_nLllbsWC0q-A-ZbeaTzew41ZyOVuE0-" } }) // search package with organisation
// fetch(url + '/package_search?include_private=true', { 'headers': { 'Authorization': CKANAPIBase.API_KEY } }) // search package with organisation
// fetch(url + '/package_autocomplete?q=ark', { 'headers': { 'Authorization': CKANAPIBase.API_KEY } }) // search package with organisation
// fetch(url + '/package_search?include_private=true', { 'headers': { 'Authorization': testuserAPIKey } }) // search package with organisation
// fetch(url + '/package_search?include_private=true') // search package with organisation
// fetch(url + '/package_search?include_private=true&q=ark&fq=organization:dublin-city-university', { 'headers': { 'Authorization': CKANAPIBase.API_KEY } }) // search package with organisation
// fetch(url + '/package_collaborator_list?id=ark-ui-design', { 'headers': { 'Authorization': CKANAPIBase.API_KEY } })
// fetch(url + "/user_list", {
// 	method: "POST",
// 	headers: {
// 		Authorization: CKANAPIBase.API_KEY,
// 	},
// 	body: formData,
// })
// 	.then((res) => res.json())
// 	.then((res) => console.log(res)); // list all users
// fetch(url + '/user_create', { 'method': 'POST', 'headers': { 'Authorization': CKANAPIBase.API_KEY }, 'body': formData })
// fetch(url + '/user_show?id=testuser&include_datasets=true&include_num_followers=true&include_password_hash=true&include_plugin_extras=true', { headers: { 'Authorization': CKANAPIBase.API_KEY } }) // list all users
// fetch(url + '/resource_show?id=53c18e09-909e-456a-9b46-546e791cd943')
// fetch(url + '/resource_show?id=bf8f6d8d-c937-4082-9d29-e734a31105f3')
// fetch(url + '/resource_show?id=4370e4f6-2e53-4991-9b5e-693fc9bf6db7', { 'headers': { 'Authorization': CKANAPIBase.API_KEY } })
// fetch(url + '/resource_search?query=package_id:7581a1b4-10b1-43bb-b447-0c35215f4e14')
// fetch(url + '/organization_member_create', { 'method': 'POST', 'headers': { 'Authorization': CKANAPIBase.API_KEY }, 'body': formData })
// fetch(url + '/api_token_list?user=testuser', { 'headers': { 'Authorization': CKANAPIBase.API_KEY } })
fetch(url + "/api_token_list?user=junli", {
    headers: { Authorization: base_1.CKANAPIBase.API_KEY },
})
    .then(function (res) { return res.json(); })
    .then(function (res) { return console.log("res: ", res); });
// 	.then((res) => {
// 		const list = res.result as Array<any>;
// 		console.log("Total tokens: ", list.length);
// 		const filtered = list.filter((item) => item.name !== "token-remove");
// 		const first5 = filtered.slice(0, 50);
// 		for (const item of first5) {
// 			// console.log("item: ", item);
// 			const formData = new FormData();
// 			formData.append("jti", item.id);
// 			formData.append("token", item.name);
// 			fetch(url + "/api_token_revoke", {
// 				method: "POST",
// 				headers: { Authorization: apiToken },
// 				body: formData,
// 			})
// 				.then((res) => res.json())
// 				.then((res) => console.log("res: ", res.success));
// 		}
// 		console.log("Token list to remove: ", first5.length);
// 	});
// fetch(url + "/api_token_revoke", {
// 	method: "POST",
// 	headers: { Authorization: apiToken },
// 	body: JSON.stringify({ token: "4989c48b-1f37-47c0-85ff-66096e1afa04" }),
// });
// fetch(url + '/api_token_create', { 'method': 'POST', 'headers': { 'Authorization': CKANAPIBase.API_KEY }, 'body': formData })
// fetch(url + '/resource_create', {
//   'method': 'POST',
//   'headers': {
//     ...formData.getHeaders(),
//     // 'Content-length': String(size),
//     'Authorization': CKANAPIBase.API_KEY
//   },
//   'body': formData
// })
// fetch(url + '/user_update', {
//   'method': 'POST',
//   'headers': {
//     ...formData.getHeaders(),
//     'Authorization': CKANAPIBase.API_KEY
//   },
//   'body': formData
// })
// fetch(url + '/site_read')
// .then(res => { console.log('1st res: ', res); return res.json() })
// .then(res => {
//   console.log('res: ', res);
// })
// .catch(err => console.error(err));
// organisation services
// CKANAPIOrganisationService.create('member_create', { username: "tcduesr", role: "editor", id: "trinity-college-dublin" });
// CKANAPIOrganisationService.get("show", {
// 	id: "university-college-dublin",
// 	include_users: true,
// }).then((res) => {
// 	console.log("res: ", res);
// 	(res as CKANAPIOrganisationShowResponse).result.users.forEach(
// 		(user: CKANAPIUser) => {
// 			console.log("user: ", user);
// 		}
// 	);
// });
// user services
// CKANUserService.get("list", {
// 	email: "haula.galadima@ucdconnect.ie",
// }).then((res) => {
// 	console.log("res: ", res);
// });
// CKANUserService.update({
// 	id: "junli",
// 	email: "junli.liang@adaptcentre.ie",
// }).then((res) => {
// 	console.log("res: ", res);
// });
// CKANUserService.create("user_create", {
// 	id: "haula_galadima",
// 	name: "haula_galadima",
// 	fullname: "Haula Galadima",
// 	email: "haula.galadima@ucdconnect.ie",
// 	password: "9dw7QBUwjgvPLNB6",
// }).then((res) => console.log("res: ", res));
// CKANResourceService.create({
//   'package_id': '7581a1b4-10b1-43bb-b447-0c35215f4e14',
//   'description': 'this is a csv file uploaded from node',
//   'name': 'foobar from node',
//   'size': size,
//   'format': 'csv',
//   'url': 'https://docs.google.com/document/d/1IV2L0IdjM3PLSv_oPjJM30GOWeSweVk1YyNl8Fk2kmM/edit'
// });
//# sourceMappingURL=get.js.map