import styled from 'styled-components';
import { Button } from '../../../components/Button';
import { Card } from '../../Card/type';

export type PlayerScoreProps = {
  card: Card;
  hiddenScore: boolean;
  addPoint: () => void;
};

export const PlayerScore = ({ card, hiddenScore, addPoint }: PlayerScoreProps) => {
  return (
    <StyledPlayerScore>
      <PlayerInfo>{card.user_name}</PlayerInfo>
      <Score>
        <ButtonWrapper>
          <Button onClick={addPoint}>GET!</Button>
        </ButtonWrapper>
        <PlayerInfoScore>{hiddenScore ? '???' : card.score}</PlayerInfoScore>
      </Score>
    </StyledPlayerScore>
  );
};

const StyledPlayerScore = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const PlayerInfo = styled.span`
  margin-left: 10px;
  font-weight: 800;
`;

const ButtonWrapper = styled.div``;

// const Button = styled.button`
//   width: 100%;
//   height: 100%;
//   border-radius: 100vh;
//   border: 4px solid #fff;
//   background-color: #243779;
//   padding: 10px 40px;
//   color: #fff;
//   font-size: 18px;
//   font-weight: 800;
//   cursor: pointer;
//   &:hover {
//     background-color: #1c2b5f;
//     transition: all 0.3s;
//   }
// `;

const PlayerInfoScore = styled.span`
  font-size: 24px;
  font-weight: 800;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;
