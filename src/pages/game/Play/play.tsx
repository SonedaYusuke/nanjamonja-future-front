import styled, { keyframes } from 'styled-components';
import { CARD_WIDTH, CARD_HEIGHT } from '../../../features/Card/const';
import { PlayerScore } from '../../../features/Player/components/PlayerScore';

import { useGame } from '../../../features/Game/hooks/useGame';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';

const HIDDEN_SCORE_THRESHOLD = 15;
const ANIMATION_DURATION = 0.3 * 1000;

export const Play = () => {
  const { deck, playCard, playedCards, players, addPoints, nameCard } = useGame();
  const [characterName, setCharacterName] = useState<string>('');
  const [displayingName, setDisplayingName] = useState('');
  const [isNameDisplayed, setIsNameDisplayed] = useState(false);
  const lastPlayedCard = playedCards.at(-1);
  const lastPrevPlayedCard = playedCards.at(-2);
  const [animation, setAnimation] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleDeckClick = () => {
    setIsNameDisplayed(false);
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, ANIMATION_DURATION);
    playCard();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterName(e.target.value);
  };

  const handleNameButtonClick = () => {
    nameCard(characterName);
    setCharacterName('');
  };

  const handleDisplayNameButtonClick = () => {
    setDisplayingName(lastPlayedCard?.character_name ?? '名前がまだないよ');
    setIsNameDisplayed(true);
  };

  console.log(deck);

  return (
    <StyledPlayLayout>
      <DeckArea>
        <DeckWrapper>
          <DeckButton onClick={handleDeckClick}>
            <img src="/images/deck.png" width={CARD_WIDTH} height={CARD_HEIGHT} />
          </DeckButton>
          <PointBudge data-type="rest">{deck.length}</PointBudge>
          <div
            style={{
              display: 'flex',
            }}
          >
            <p>カードをめくる</p>
          </div>
        </DeckWrapper>
      </DeckArea>
      <DisplayCardArea>
        <CardWrapper>
          {playedCards.length === 0 && deck.length === 0 ? (
            <div
              style={{
                display: 'grid',
                gap: '16px',
              }}
            >
              ゲームが終了しました
              <Button onClick={() => navigate('/game/ranking')}>ランキングへ</Button>
            </div>
          ) : (
            <>
              {playedCards.length > 0 ? (
                <>
                  <Card src={lastPrevPlayedCard?.content} data-prev />
                  <Card src={lastPlayedCard?.content} data-animation={animation} />
                  {/* {lastPlayedCard?.character_name ?? "カードの名前がありません"} */}
                </>
              ) : (
                <div
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                  }}
                ></div>
              )}
              <PointBudge data-type="point">{playedCards.length}</PointBudge>
            </>
          )}
        </CardWrapper>
      </DisplayCardArea>
      <PlayersArea>
        {players.map((player) => (
          <PlayerScore
            key={player.id}
            player={player}
            hiddenScore={deck.length <= HIDDEN_SCORE_THRESHOLD}
            handleAddScoreButton={addPoints}
          />
        ))}
      </PlayersArea>
      <OperationArea>
        <label
          style={{
            display: 'grid',
          }}
        >
          カードの名前
          <input placeholder="モジャひめ" value={characterName} onChange={handleNameChange} />
        </label>
        <Button onClick={handleNameButtonClick}>カードに名前をつける</Button>

        {isNameDisplayed ? (
          <span>{displayingName}</span>
        ) : (
          <span
            style={{
              borderBottom: '3px dotted #84cc16',
            }}
          ></span>
        )}
        <Button variant="secondary" onClick={handleDisplayNameButtonClick}>
          カードの名前を確認する
        </Button>
      </OperationArea>
    </StyledPlayLayout>
  );
};

const StyledPlayLayout = styled.div`
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-rows: 80% 20%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 1200px;
  height: 100vh;
`;

const DeckArea = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: grid;
  place-content: center;
  gap: 16px;
`;

const DisplayCardArea = styled.div`
  padding: 16px;
  grid-area: 1 / 2 / 2 / 3;
  display: grid;
  place-content: center;
  position: relative;
`;

const PlayersArea = styled.div`
  grid-area: 1 / 3 / 2 / 4;
  display: grid;
  gap: 32px;
`;

const OperationArea = styled.div`
  grid-area: 2 / 1 / 3 / 4;
  display: grid;
  place-content: center;
  gap: 16px;
  grid-template-columns: 300px 300px; /* 2カラム */
  grid-template-rows: 48px 48px;
  padding-bottom: 32px;
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

const DeckWrapper = styled.div`
  position: relative;
`;

const DeckButton = styled.button`
  cursor: pointer;
  :hover {
    transform: translateY(-4px);
    transition: all 0.3s;
  }
`;
