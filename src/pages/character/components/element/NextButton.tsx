import styled from 'styled-components';

export const NextButton = styled.button`
  position: fixed;
  right: 0;
  top: 10px;
  background-color: #ff0000;
  border-radius: 100vh 0 0 100vh;
  border: 4px solid #fff;
  border-right: none;
  padding: 10px 20px 10px 30px;
  color: #fff;
  font-weight: 900;
  font-size: 16px;
  &:disabled {
    filter: grayscale(1);
  }
`;
