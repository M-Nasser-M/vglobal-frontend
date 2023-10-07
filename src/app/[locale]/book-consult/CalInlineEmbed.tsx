"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CalThemeAtom } from "@/atoms/atoms";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export default function CalInlineEmbed() {
  const calThemeVal = useAtomValue(CalThemeAtom);
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#E53E3E" } },
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: calThemeVal,
      });
    })();
  }, []);
  return (
    <Cal
      calLink="ehabmagdy-vglobal/canada-immigration"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
