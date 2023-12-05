const defaultFetchOptionsGet: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const defaultFetchOptionsPost = (body: object): RequestInit => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
};

const defaultFetchOptionsGetAuth: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  },
};

const defaultFetchOptionsPostAuth = (body: object): RequestInit => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  };
};

export const FetchApiPublicGet = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const finalOptions = { ...defaultFetchOptionsGet, ...options };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`,
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
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`,
    finalOptions
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const FetchApiAuthGet = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const finalOptions = { ...defaultFetchOptionsGetAuth, ...options };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`,
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
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`,
    finalOptions
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
