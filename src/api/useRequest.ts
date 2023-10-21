import useSWR from 'swr';
import { getCards } from '.';
import { useEffect } from 'react';

export const useGetCards = () => {
  const { data, error } = useSWR('/api/cards', getCards);

  // 初期化
  useEffect(() => {
    if (!data) return;
    data.forEach((card) => {
      card.score = 0;
    });
  }, [data]);

  return {
    cards: data,
    error,
  };
};
