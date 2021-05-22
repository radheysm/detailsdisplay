import axios from "axios";
/**
 * request interceptors
 * @param {String} method GET,PUT,POST,DELETE
 * @param {String} url req url
 * @param {Object} params query parameters
 * @param {Object} body req body
 * @param {Object} headers req headers
 */
export const request = (
  method,
  url,
  params,
  body = {},
  headers = {},
  token='',
) => {
  // console.log("Token",token);
  token = token || {};
  headers = headers || {};
  params = params || {};
  body = body || {};
  if (!headers["content-type"]) {
    headers["content-type"] = "application/json";
  }
  if (token) {
      headers.Authorization = `Bearer ${token}`;
   } 

  const options = {
    method,
    headers,
    params,
    url
  };
  if (
    (method === "POST" || method === "PUT") &&
    headers["content-type"] === "multipart/form-data"
  ) {
    headers["content-type"] = "multipart/form-data";

    // prepate multipart formdata body
    const formData = new FormData();
    const keys = Object.keys(body);

    for (let i = 0; i < keys.length; i++) {
      if (body[keys[i]] && typeof body[keys[i]] === 'object' && Object.keys(body[keys[i]]).length > 0) {
        for (const key of Object.keys((body[keys[i]]))) {
          formData.append(keys[i], (body[keys[i]][key]))
        }
      } else {
        formData.append(keys[i], body[keys[i]]);
      }
    }
    options.data = formData;
  } else if (method === "POST" || method === "PUT") {
    options.data = body;
  }
  return axios(options)
    .then(data => {
      return Promise.resolve(data);
    })
    .catch(e => {
      const err =
        e.response &&
          e.response.data &&
          e.response.data.error &&
          e.response.data.error.length > 0 &&
          e.response.data.error[0]
          ? e.response.data.error[0]
          : null;
      const errorName = err ? err.name : "";
      console.error("errorName", errorName);
        return Promise.reject(e);
    });
};