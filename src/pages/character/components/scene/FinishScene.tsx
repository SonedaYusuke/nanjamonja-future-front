import styled from 'styled-components';

export const FinishScene = () => {
  return (
    <Layout>
      <p>作成完了だよ！</p>
      <p>ゲーム画面を見てね！</p>
    </Layout>
  );
};

const Layout = styled.div`
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > p {
    font-size: 24px;
    font-weight: 800;
  }
`;
