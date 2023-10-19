import { atom, useAtom } from "jotai";
import { Card } from "../features/Card/type";

const playerCardsAtom = atom<Card[]>([]);

export const usePlayerCardAtom = () => {
  return useAtom(playerCardsAtom);
};
