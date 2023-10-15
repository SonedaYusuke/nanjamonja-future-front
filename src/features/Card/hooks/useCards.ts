import { useEffect, useState } from 'react';
import { Card } from '../type';

export type UseCards = {
  cards: Card[] | undefined;
};

const GET_CARDS_URL = 'https://h3nckvn8-8000.asse.devtunnels.ms/api/user/get/';

const MAX_CARD_COUNT = 7;

export const useCards = () => {
  const [cards, setCards] = useState<Card[] | null>(null);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const appendSelectedCards = (card: Card) => {
    setSelectedCards([...selectedCards, card]);
  };

  const removeSelectedCards = (card: Card) => {
    const newSelectedCards = selectedCards.filter((selectedCard) => selectedCard.id !== card.id);
    setSelectedCards(newSelectedCards);
  };

  const selectRandomCards = () => {
    if (selectedCards.length === MAX_CARD_COUNT) {
      return;
    }

    if (cards === null) {
      return;
    }

    const availableCards = cards.filter((card) => !selectedCards.some((selectedCard) => selectedCard.id === card.id));

    const numCardsToSelect = MAX_CARD_COUNT - selectedCards.length;
    const selectedRandomCards = [];

    for (let i = 0; i < numCardsToSelect; i++) {
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      selectedRandomCards.push(availableCards[randomIndex]);
      availableCards.splice(randomIndex, 1);
    }

    return selectedRandomCards;
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(GET_CARDS_URL).then((res) => res.json());
      setCards(res);
    })();
  }, []);

  return {
    cards,
    selectedCards,
    appendSelectedCards,
    removeSelectedCards,
    selectRandomCards,
  };
};
