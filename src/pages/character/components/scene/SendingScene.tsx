import styled from 'styled-components';

export const SendingScene = () => {
  return (
    <Layout>
      <p>送信中...</p>
    </Layout>
  );
};

const Layout = styled.div`
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  > p {
    font-size: 24px;
    font-weight: 800;
  }
`;
