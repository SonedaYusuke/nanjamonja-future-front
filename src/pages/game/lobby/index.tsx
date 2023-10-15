import styled from 'styled-components';
import { CardCheckBox } from '../../../features/Card/components/CardCheckBox';

import { useCards } from '../../../features/Card/hooks/useCards';
import { Card } from '../../../features/Card/type';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../../features/Game/hooks/useGame';

// 選択できるカードの最大の数
const MAX_SELECTABLE_CARD_COUNT = 4;
// 選択するカードの最小の数
const MIN_SELECTABLE_CARD_COUNT = 3;

export const Lobby = () => {
  const { cards, selectedCards, appendSelectedCards, removeSelectedCards, selectRandomCards } = useCards();

  const { startGame } = useGame();

  const navigate = useNavigate();

  const handleChange = (card: Card) => {
    if (selectedCards.length === MAX_SELECTABLE_CARD_COUNT && !selectedCards.includes(card)) {
      return;
    }
    if (selectedCards.includes(card)) {
      removeSelectedCards(card);
    } else {
      appendSelectedCards(card);
    }
  };

  const handleStartButtonClick = () => {
    if (selectedCards.length < MIN_SELECTABLE_CARD_COUNT) {
      return;
    }
    // 8種類になったカード
    // 名前むずい
    const randomlySelectedCards = selectRandomCards();
    if (!randomlySelectedCards) {
      return;
    }
    startGame(selectedCards, randomlySelectedCards);
    navigate('/game/play');
  };

  if (!cards) {
    return <GameLayout>loading...</GameLayout>;
  }

  return (
    <GameLayout>
      <Header>
        <h1>カード選択</h1>
        <p>参加する人が描いたカードを選んでね！！</p>
      </Header>
      <CardList>
        {cards.map((card) => (
          <CardCheckBox
            key={card.id}
            card={card}
            checked={selectedCards.includes(card)}
            handleChange={() => handleChange(card)}
          />
        ))}
      </CardList>

      <ParticipateHumans>
        {[...new Array(selectedCards.length)].map((_, index) => (
          <HumanImg key={index} src="/images/participate.png" alt="" />
        ))}
        {[...new Array(MAX_SELECTABLE_CARD_COUNT - selectedCards.length)].map((_, index) => (
          <HumanImg key={index} src="/images/stand.png" alt="" />
        ))}
      </ParticipateHumans>

      <button onClick={handleStartButtonClick}>
        <GameStart data-submittable={selectedCards.length >= MIN_SELECTABLE_CARD_COUNT}>Game Start!</GameStart>
      </button>
    </GameLayout>
  );
};

const GameLayout = styled.div`
  padding: 30px 60px 80px 60px;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const GameStart = styled.div`
  box-sizing: border-box;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #ec5f43;
  color: #fff;
  width: 50%;
  max-width: 400px;
  height: 50px;
  border-radius: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  font-size: 20px;
  font-weight: 800;
  color: '#fff';
  transition: transform 0.2s ease-out;
  &[data-submittable='false'] {
    background-color: #aaa;
    pointer-events: none;
  }
`;

const ParticipateHumans = styled.div`
  position: fixed;
  right: 10px;
  bottom: 20px;
  display: flex;
  align-items: flex-end;
  height: 85px;
`;

const HumanImg = styled.img`
  width: 30px;
`;

const Header = styled.div`
  margin-bottom: 32px;
  > h1 {
    font-size: 20px;
  }
  > p {
    font-size: 16px;
  }
`;
