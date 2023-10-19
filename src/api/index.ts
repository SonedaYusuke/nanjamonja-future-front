import { Card } from "../features/Card/type";

export const API_URL = 'http://localhost:5678/api/cards';

type Character = {
  user_name: string;
  data_uri: string;
}

type Response = {
  cards: Card[];
};

export const postCharacter = async (character: Character) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(character),
  });
  return res.json();
}

export const getCards = async () => {
  const res = (await fetch(API_URL).then((res) => res.json())) as Response;

  return Promise.resolve(res.cards);
}
