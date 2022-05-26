import nodeFetch from 'node-fetch';
import NodeFormData from 'form-data';
import {
	getUserAPIToken,
	getUserAPITokenList,
	requestAPIToken,
	revokeUserAPIToken
} from '.';
global.fetch = nodeFetch;
global.FormData = NodeFormData;

const username = 'tcdtestuser';

describe('test base ckan functions', () => {
	let tokenList = [];
	test('requestAPIToken', async () => {
		const res = await requestAPIToken(username);
		// console.log('res: ', res);
		expect(typeof res).toBe('string');
	});

	test('getUserAPIToken', async () => {
		const res = await getUserAPIToken(username);
		// console.log('res: ', res);
		expect(typeof res).toBe('string');
	});

	test('getUserAPITokenList', async () => {
		tokenList = await getUserAPITokenList(username);
		// console.log('res: ', res);
		expect(tokenList.length > 0).toBeTruthy();
	});

	test('revokeUserAPIToken', async () => {
		// console.log('tokenList: ', tokenList);
		const res = await revokenTokenList(tokenList.map(el => el.id));
		// console.log('res: ', res);
		expect(res.every(el => el === true)).toBeTruthy();
	});
});

const revokenTokenList = (list) => {
	return Promise.all(list.map(el => revokeUserAPIToken({
		'jti': el
	})));
};