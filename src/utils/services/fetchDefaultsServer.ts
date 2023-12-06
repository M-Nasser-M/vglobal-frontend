import { serverENV } from "@/serverENV.mjs";

const defaultFetchOptionsGetAuth: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${serverENV.STRAPI_API_TOKEN}`,
  },
  next: { revalidate: 3600 },
};

const defaultFetchOptionsPostAuth = (body: object): RequestInit => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serverENV.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify(body),
    next: { revalidate: 3600 },
  };
};

export const FetchApiAuthGet = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const finalOptions = { ...defaultFetchOptionsGetAuth, ...options };

  const response = await fetch(
    `${serverENV.STRAPI_API_URL}${url}`,
    finalOptions
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const FetchApiAuthPost = async <T>(
  url: string,
  body: object = {},
  options: RequestInit = {}
): Promise<T> => {
  const finalOptions = { ...defaultFetchOptionsPostAuth(body), ...options };

  const response = await fetch(
    `${serverENV.STRAPI_API_URL}${url}`,
    finalOptions
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
