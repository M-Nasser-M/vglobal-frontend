import type { ExtendedSession } from "@/utils/types/extendedSession";
import type { ColorMode } from "@chakra-ui/react";
import type { Locale } from "@/i18n";
import { atom } from "jotai";

export const SessionAtom = atom<ExtendedSession>(null);
export const CalThemeAtom = atom<ColorMode>("light");
export const LocaleAtom = atom<Locale>("en");
