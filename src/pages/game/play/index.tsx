import styled, { keyframes } from 'styled-components';
import { PlayerScore } from '../../../features/Player/components/PlayerScore';

import { useGame } from '../../../features/Game/hooks/useGame';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { API_URL } from '../../../api';
import { useSelectedCardAtom } from '../../../store/card';
import { useGetCards } from '../../../api/useRequest';
import { Card } from '../../../features/Card/type';

const HIDDEN_SCORE_THRESHOLD = 15;
const ANIMATION_DURATION = 0.3 * 1000;

/**
 * ゲームで使用されるカードの種類
 */
const TOTAL_CARD_KIND = 7;

/**
 * 1種類のカードが存在する枚数
 */
const SAME_CARD_COUNT = 3;

const shuffle = <T,>(array: T[]) =>{
  return array.sort(() => Math.random() - 0.5);
}

export const Play = () => {
  const { cards } = useGetCards();
  const [selectedCards] = useSelectedCardAtom();
  const [stage, setStage] = useState<Card[]>([])
  const [stock, setStock] = useState<Card[]>([])

  // 初回だけ実行
  useEffect(() => {
    if (!cards) return;

    let randomCards = shuffle(cards);

    selectedCards.forEach(({uuid}) => {
      randomCards = randomCards.filter((card) => card.uuid !== uuid)
    });

    const randomSelectedCards = randomCards.slice(0, TOTAL_CARD_KIND - selectedCards.length);

    const allCards = [...selectedCards, ...randomSelectedCards];

    setStock(shuffle<Card>(new Array(SAME_CARD_COUNT).fill(allCards).flat()));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards])

  const turnOver = useCallback(() => {
    if (stock.length === 0) return;
    const [card] = stock;
    setStock((prev) => prev.slice(1));
    setStage((prev) => [...prev, card]);
  }, [stock, setStage, setStock])

  if (!cards) return <></>

  return (
    <div>
      <button onClick={turnOver}>カードをめくる</button>
      {stage.map((card, index) => (
        <Card key={index} src={`${API_URL}/${card.uuid}`} />
      ))}
    </div>
    // <PlayLayout>
    //   <DeckWrapper>
    //     <DeckButton onClick={handleDeckClick}>
    //       <DeckCards src="/images/stage.png" />
    //       <PointBudge data-type="rest">{stage.length}</PointBudge>
    //     </DeckButton>
    //   </DeckWrapper>
    //   <DisplayCardArea>
    //     <CardWrapper>
    //       {playedCards.length === 0 && stage.length === 0 ? (
    //         <div>
    //           <Button onClick={() => navigate('/game/ranking')}>ランキングへ</Button>
    //         </div>
    //       ) : (
    //         <div>
    //           {playedCards.length > 0 && (
    //             <>
    //               <Card src={`${API_URL}/${lastPrevPlayedCard.uuid}`} data-prev />
    //               <Card src={`${API_URL}/${lastPlayedCard.uuid}`} data-animation={animation} />
    //               <PointBudge data-type="point">{playedCards.length}</PointBudge>
    //               {isNameDisplayed ? (
    //                 <span>{displayingName}</span>
    //               ) : (
    //                 <button onClick={handleDisplayNameButtonClick}>
    //                   <span>名前を確認する</span>
    //                 </button>
    //               )}
    //             </>
    //           )}
    //         </div>
    //       )}
    //     </CardWrapper>
    //   </DisplayCardArea>
    //   <PlayersArea>
    //     {players.map((player) => (
    //       <PlayerScore
    //         key={player.id}
    //         player={player}
    //         hiddenScore={stage.length <= HIDDEN_SCORE_THRESHOLD}
    //         handleAddScoreButton={addPoints}
    //       />
    //     ))}
    //   </PlayersArea>
    //   {playedCards.length > 0 && (
    //     <OperationArea>
    //       <InputName placeholder="名前を入力" value={characterName} onChange={handleNameChange} />
    //       <Button onClick={handleNameButtonClick}>名前をつける</Button>
    //     </OperationArea>
    //   )}
    // </PlayLayout>
  );
};

const PlayLayout = styled.div`
  display: grid;
  grid-template-columns: 25% 50% 25%;
  gap: 20px;
  height: 100svh;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
`;

const DisplayCardArea = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const PlayersArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const OperationArea = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  gap: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 20px;
  align-items: center;
`;

const CardWrapper = styled.div`
  position: relative;
`;

const cardAnimation = keyframes`
  0% {
    transform: translate(0, 80px) rotate(-10deg);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

const DeckCards = styled.img`
  width: 100%;
`;

const Card = styled.img`
  width: 240px;
  border-radius: 20px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  transform-origin: center bottom;
  &[data-animation='true'] {
    animation: ${cardAnimation} ${ANIMATION_DURATION}ms ease-out;
  }
  &[data-prev] {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const PointBudge = styled.div`
  width: 50px;
  height: 50px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 24px;
  font-weight: 800;
  position: absolute;
  top: -20px;
  right: -20px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  &[data-type='point'] {
    background-color: #1ba951;
  }
  &[data-type='rest'] {
    background-color: #f3330d;
  }
`;

const InputName = styled.input`
  font-family: 'Zen Maru Gothic', Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #333;
  border-radius: 0;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  width: 300px;
`;

const DeckWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: fit-content;
  margin: auto;
`;

const DeckButton = styled.button`
  cursor: pointer;
  width: 35%;
  max-width: 300px;
  position: relative;
  :hover {
    transform: translateY(-4px);
    transition: all 0.3s;
  }
`;
