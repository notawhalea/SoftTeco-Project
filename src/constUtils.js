function constUtils(url, params, headers) {
  return {
    method: "GET",
    url: url,
    params: params,
    headers: headers,
  };
}

export default constUtils;