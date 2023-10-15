import styled from 'styled-components';
import { NextButton } from '../element/NextButton';

interface Props {
  next: () => void;
  setUserName: (name: string) => void;
  isSubmittable: boolean;
}

export const UserNameScene = ({ next, setUserName, isSubmittable }: Props) => {
  return (
    <Layout>
      <NextButton onClick={next} disabled={!isSubmittable}>
        次へ
      </NextButton>
      <p>あなたの名前を入力してね！</p>
      <input onChange={(e) => setUserName(e.target.value)} type="text" />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100svh;
  > p {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 10px;
  }
  > input {
    font-size: 24px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #000;
    border-radius: 0;
    width: 80%;
    text-align: center;
  }
`;
