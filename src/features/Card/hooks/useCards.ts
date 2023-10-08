import { useEffect, useState } from "react";
import { Card } from "../type";

export type UseCards = {
  cards: Card[] | undefined;
};

const DUMMY_CARDS: Card[] = [
  {
    content: "https://firebasestorage.googleapis.com/v0/b/aisozai.appspot.com/o/watermarked_pictures%2F768x512%2FATJzfvSQSC.jpeg?alt=media&token=789370fc-9939-4f19-abef-68b2624cf3bc",
    default_flg: 0,
    highest_score: 0,
    id: "34",
    participant_count: 0,
    user_name: "ジョグ",
    name: ''
  }
];

export const useCards = () => {
  const [cards, setCards] = useState<Card[] | null>(DUMMY_CARDS);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const appendSelectedCards = (card: Card) => {
    setSelectedCards([...selectedCards, card]);
  };

  const removeSelectedCards = (card: Card) => {
    const newSelectedCards = selectedCards.filter(
      (selectedCard) => selectedCard.user_name !== card.user_name
    );
    setSelectedCards(newSelectedCards);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("https://h3nckvn8-8000.asse.devtunnels.ms/api/user/get/").then((res) => res.json());
      setCards(res);
    })()
  }, [])

  return {
    cards,
    selectedCards,
    appendSelectedCards,
    removeSelectedCards,
  };
};
