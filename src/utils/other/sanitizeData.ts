import { DOMPurifyI } from "dompurify";

let DOMPurify: DOMPurifyI;
if (typeof window !== "undefined") {
  DOMPurify = require("dompurify");
}

export const sanitizeData = (data: string) => {
  return {
    __html: DOMPurify ? DOMPurify.sanitize(data) : data,
  };
};
