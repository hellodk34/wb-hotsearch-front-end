//全局路径
//const commonUrl = 'http://192.168.1.118:8091'
const commonUrl = "https://weibo1.hellodk.com";
//解析json
function parseJSON(response) {
	return response.json();
}
//检查请求状态
function checkStatus(response) {
	if (response.status >= 200 && response.status < 500) {
		return response;
	}
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

export default function request(url, options = {}) {
	const { method } = options;

	return fetch(commonUrl + url, {
		method: method,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"mode": "cors",
			"Access-Control-Allow-Origin": "*",
		},
	})
		.then(checkStatus)
		.then(parseJSON)
		.catch((err) => ({ err }));
}
