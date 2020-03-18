import fetch from "node-fetch";

export const customFetch = async (url, method = "GET", mode = "cors") => {
  const response = await fetch(url, { method, mode });
  const json = await response.json();
  return json;
};
