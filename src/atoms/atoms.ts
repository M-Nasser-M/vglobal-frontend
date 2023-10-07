import { ExtendedSession } from "@/utils/types/extendedSession";
import { ColorMode } from "@chakra-ui/react";
import { atom } from "jotai";

export const SessionAtom = atom<ExtendedSession>(null);
export const CalThemeAtom = atom<ColorMode>("light");
