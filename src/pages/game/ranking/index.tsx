import styled from 'styled-components';
import { useGame } from '../../../features/Game/hooks/useGame';
import { LiaCrownSolid } from 'react-icons/lia';

export const Ranking = () => {
  const { players } = useGame();
  players.sort((a, b) => b.score - a.score);
  const WinnerScore = players[0].score;
  return (
    <StyledLayout>
      <StyledArea>
        {players.map((player, index) => (
          <StyledPlayer rank={players.length - index}>
            <StyledRank>{WinnerScore == player.score ? <LiaCrownSolid color="#FFD700" /> : ''}</StyledRank>
            <StyledScore>
              {player.name} : {player.score}枚
            </StyledScore>
          </StyledPlayer>
        ))}
      </StyledArea>
    </StyledLayout>
  );
};
const StyledPlayer = styled.div<{ rank: number }>`
  font-size: ${({ rank }) => String(30 + rank * 7)}px;
  width: 100%;
  display: flex;
  text-align: center;
`;
const StyledArea = styled.div`
  display: grid;
  margin: 0 auto;
`;
const StyledLayout = styled.div`
  display: grid;
  place-content: center;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
`;
const StyledRank = styled.span`
  padding-top: 10px;
`;
const StyledScore = styled.span``;
