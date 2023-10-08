import { useState } from "react";
import { Card } from "../type";

const dummyCards: Card[] = [
  {
    userName: "user1",
    imgPath:
      "https://firebasestorage.googleapis.com/v0/b/aisozai.appspot.com/o/watermarked_pictures%2F768[…]?alt=media&token=789370fc-9939-4f19-abef-68b2624cf3bc",
  },
  {
    userName: "user2",
    imgPath:
      "https://storage.googleapis.com/aisozai-thumbnails/watermarked_pictures/384x256/qwchRTyTfL.jpeg",
  },
  {
    userName: "user3",
    imgPath:
      "https://res.cloudinary.com/techfeed/image/upload/w_96,h_96,c_fill/v1585110459/users/wqrb2bwadnhi0df00qmm.png",
  },
  {
    userName: "user4",
    imgPath:
      "https://publicdomainq.net/pictures/2023s/2023-07s/2023-07-31s/publicdomainq-0073395ztv.jpg",
  },
  {
    userName: "user5",
    imgPath:
      "https://publicdomainq.net/pictures/2023s/2023-06s/2023-06-16s/publicdomainq-0072479rlg.jpg",
  },
  {
    userName: "user6",
    imgPath:
      "https://res.cloudinary.com/techfeed/image/upload/w_96,h_96,c_fill/v1585110459/users/wqrb2bwadnhi0df00qmm.png",
  },
];

export type UseCards = {
  cards: Card[] | undefined;
};

export const useCards = () => {
  const [cards] = useState<Card[] | undefined>(dummyCards);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const appendSelectedCards = (card: Card) => {
    setSelectedCards([...selectedCards, card]);
  };
  const removeSelectedCards = (card: Card) => {
    const newSelectedCards = selectedCards.filter(
      (selectedCard) => selectedCard.userName !== card.userName
    );
    setSelectedCards(newSelectedCards);
  };

  return {
    cards,
    selectedCards,
    appendSelectedCards,
    removeSelectedCards,
  };
};
