import useSWR from "swr";
import { getCards } from ".";

export const useGetCards = () => {
  const { data, error } = useSWR('/api/cards', getCards)

  return {
    cards: data,
    error
  }
}