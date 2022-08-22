import nodeFetch from 'node-fetch';
import NodeFormData from 'form-data';
import {
	getUserAPIToken,
	getUserAPITokenList,
	requestAPIToken,
	revokeUserAPIToken
} from '..';
global.fetch = nodeFetch;
global.FormData = NodeFormData;
global.console = {
	...console,
	log: jest.fn(),
	debug: jest.fn(),
};
jest.setTimeout(10000);

const username = 'tcdtestuser';

let tokenList = [];

afterAll(async () => {
	for (const el of tokenList) {
		await revokeUserAPIToken({
			'jti': el.id
		});
	}
});

describe('test base ckan functions', () => {
	test('requestAPIToken', async () => {
		const res = await requestAPIToken(username);
		// console.log('res: ', res);
		expect(typeof res).toBe('string');
	});

	test('getUserAPIToken', async () => {
		const res = await getUserAPIToken(username);
		console.log('res: ', res);
		expect(typeof res).toBe('string');
	});

	test('getUserAPITokenList', async () => {
		tokenList.push(...await getUserAPITokenList(username));
		// console.log('res: ', res);
		console.log('tokenList: ', tokenList);
		expect(tokenList.length > 0).toBeTruthy();
	});
});