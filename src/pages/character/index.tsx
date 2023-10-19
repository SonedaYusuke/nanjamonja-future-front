import styled from 'styled-components';

import { InputNameScene } from './components/scene/InputNameScene';
import { OekakiScene } from './components/scene/OekakiScene';
import { FinishScene } from './components/scene/FinishScene';
import { useState } from 'react';
import { SendingScene } from './components/scene/SendingScene';
import { postCharacter } from '../../api';

type Scene = number;

const CharacterLayout = styled.div`
  width: 100%;
  height: 100svh;
`;

export const Character = () => {
  const [scene, setScene] = useState<Scene>(0);
  const [userName, setUserName] = useState<string>('');

  const sendCharacter = async (data_uri: string) => {
    setScene((prev) => prev + 1);

    await postCharacter({
      user_name: userName,
      data_uri: data_uri,
    });

    setScene((prev) => prev + 1);
  };

  return (
    <CharacterLayout>
      {scene === 0 && (
        <InputNameScene
          next={() => setScene((prev) => prev + 1)}
          setUserName={setUserName}
          isSubmittable={userName.length > 0}
        />
      )}
      {scene === 1 && <OekakiScene next={sendCharacter} />}
      {scene === 2 && <SendingScene />}
      {scene === 3 && <FinishScene />}
    </CharacterLayout>
  );
};
