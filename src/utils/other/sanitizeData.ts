import xss from "xss";
export const sanitizeData = (data: string) => {
  return {
    __html: xss(data),
  };
};
