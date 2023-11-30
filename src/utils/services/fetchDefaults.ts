export const FetchApiPublicGet = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

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
  body = {},
  options: RequestInit = {}
): Promise<T> => {
  const defaultOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const finalOptions = { ...defaultOptions, ...options };

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
  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

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
  body: BodyInit | null = null,
  options: RequestInit = {}
): Promise<T> => {
  const defaultOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body,
  };

  const finalOptions = { ...defaultOptions, ...options };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`,
    finalOptions
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
