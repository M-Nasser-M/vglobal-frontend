import { clientENV } from "@/clientENV.mjs";

const defaultFetchOptionsGet: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  next: { revalidate: 3600 },
};

const defaultFetchOptionsPost = (req_body: object): RequestInit => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req_body),
    next: { revalidate: 3600 },
  };
};

export const FetchApiPublicGet = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const finalOptions = { ...defaultFetchOptionsGet, ...options };

  const response = await fetch(
    `${clientENV.NEXT_PUBLIC_STRAPI_API_URL}${url}`,
    finalOptions
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const FetchApiPublicPost = async <T>(
  url: string,
  body: object = {},
  options: RequestInit = {}
): Promise<T> => {
  const finalOptions = { ...defaultFetchOptionsPost(body), ...options };

  const response = await fetch(
    `${clientENV.NEXT_PUBLIC_STRAPI_API_URL}${url}`,
    finalOptions
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
