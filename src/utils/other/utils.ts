import { ReadonlyURLSearchParams } from "next/navigation";

export const createQueryString = (
  name: string,
  value: string | number,
  searchParams: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, String(value));

  return params.toString();
};

export const isEven = (num: number) => num % 2 === 0;

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
