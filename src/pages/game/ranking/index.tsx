import styled from 'styled-components';
import { usePlayerCardAtom } from '../../../store/card';
import { useMemo } from 'react';
import { API_URL } from '../../../api';

export const Ranking = () => {
  const [players] = usePlayerCardAtom();

  const rankedPlayers = useMemo(() => {
    return players.sort((a, b) => b.score - a.score);
  }, [players]);

  return (
    <Layout>
      <Area>
        {rankedPlayers.map((player, index) => (
          <Player key={player.uuid} data-champion={index === 0}>
            <Card src={`${API_URL}/${player.uuid}`} alt="" />
            <Score>
              {player.user_name} : {player.score}Point
            </Score>
          </Player>
        ))}
      </Area>
    </Layout>
  );
};

const Player = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Card = styled.img`
  width: 120px;
  border-radius: 10px;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  [data-champion='true'] & {
    width: 160px;
  }
`;

const Area = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 40px;
  align-items: self-end;
`;
const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100svh;
`;

const Score = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  [data-champion='true'] & {
    font-size: 20px;
  }
`;
