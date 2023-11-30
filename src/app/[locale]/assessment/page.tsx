import { redirect } from "next/navigation";

const Page = () => {
  redirect(
    "https://secure.officio.ca/qnr?id=1896&hash=6af747943b782181d9b169aaa406eb91"
  );
};

export default Page;
