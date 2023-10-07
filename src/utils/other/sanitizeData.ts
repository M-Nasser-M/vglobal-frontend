import DOMPurify from "isomorphic-dompurify";
export const sanitizeData = (data: string) => {
  return {
    __html: DOMPurify.sanitize(data),
  };
};
