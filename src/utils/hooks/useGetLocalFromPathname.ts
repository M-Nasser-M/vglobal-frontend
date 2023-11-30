import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n";

export const useGetLocalFromPathname = (): Locale => {
  const pathname = usePathname();
  return pathname?.split("/")[1] as Locale;
};
