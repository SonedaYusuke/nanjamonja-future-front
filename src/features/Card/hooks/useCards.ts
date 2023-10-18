import { useEffect, useState } from 'react';
import { Card } from '../type';

export type UseCards = {
  cards: Card[] | undefined;
};

type Response = {
  cards: Card[];
};

const GET_CARDS_URL = 'http://localhost:5678/api/cards';

const MAX_CARD_COUNT = 7;

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>();
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const appendSelectedCards = (card: Card) => {
    setSelectedCards([...selectedCards, card]);
  };

  const removeSelectedCards = (card: Card) => {
    const newSelectedCards = selectedCards.filter((selectedCard) => selectedCard.uuid !== card.uuid);
    setSelectedCards(newSelectedCards);
  };

  const selectRandomCards = () => {
    if (selectedCards.length === MAX_CARD_COUNT) return;
    if (!cards) return;

    const availableCards = cards.filter(
      (card) => !selectedCards.some((selectedCard) => selectedCard.uuid === card.uuid)
    );

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
      if (cards) return;
      const res = (await fetch(GET_CARDS_URL).then((res) => res.json())) as Response;
      setCards(res.cards);
    })();
  }, [cards]);

  return {
    cards,
    selectedCards,
    appendSelectedCards,
    removeSelectedCards,
    selectRandomCards,
  };
};
