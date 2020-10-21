const fetchUtil = async (urlPath, method, body = {}) => {
  let url = process.env.REACT_APP_SERVER_URL + urlPath;
  if (process.env.REACT_APP_ENV === "development") {
    url = urlPath;
  }

  let params = {};
  if (method === "GET") {
    params = {
      method: method,
      credentials: "include",
    };
    
  } else {
    params = {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    };
  }

  let response = await fetch(url, params);

  response = await response.text();
  return JSON.parse(response);
};

export default fetchUtil;
