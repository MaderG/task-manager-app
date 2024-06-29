import env from "../utils/env";

const BASE_URL = env.VITE_BACKEND_URL;

async function fetcher(url, options = {}) {
  const token =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.cause = data.message;
    error.original = data;
    throw error;
  }

  return data;
}

fetcher.post = function (url, data) {
  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

fetcher.patch = function (url, data) {
  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

fetcher.delete = function (url) {
  return fetcher(url, {
    method: "DELETE",
  });
};

export default fetcher;
