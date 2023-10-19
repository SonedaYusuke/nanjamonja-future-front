import { atom, useAtom } from "jotai";
import { Card } from "../features/Card/type";

const cardAtom = atom<Card[]>([]);

export const useSelectedCardAtom = () => {
  return useAtom(cardAtom);
};
