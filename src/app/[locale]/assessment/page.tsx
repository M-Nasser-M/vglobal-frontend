import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  redirect(
    "https://secure.officio.ca/qnr?id=1896&hash=6af747943b782181d9b169aaa406eb91"
  );
  return <div>assessment</div>;
};

export default Page;
