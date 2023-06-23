export function getApiOptions(url, params, headers) {
  return {
    method: "GET",
    url: url,
    params: params,
    headers: headers,
  };
}
