import styled, { css } from 'styled-components';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Card } from '../type';
import { CARD_HEIGHT, CARD_WIDTH } from '../const';

export type CardCheckBoxProps = {
  card: Card;
  checked: boolean;
  handleChange: () => void;
};

export const CardCheckBox: React.FC<CardCheckBoxProps> = ({ card, checked, handleChange }) => {
  return (
    <StyledCardCheckBox>
      <ImgWrapper>
        <StyledCheckbox id="cardCheck" type="checkbox" checked={checked} onChange={handleChange} />
        {checked && <StyledCheckIcon checked={checked} />}
        <StyledImg src={card.content} width={CARD_WIDTH} height={CARD_HEIGHT} checked={checked} />
      </ImgWrapper>
      <UserName>{card.user_name}</UserName>
    </StyledCardCheckBox>
  );
};

const StyledCardCheckBox = styled.div`
  width: 160px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ImgWrapper = styled.label`
  position: relative;
  transition: transform 0.2s ease-out;
  &:hover {
    transform: scale(1.04);
  }
`;

const StyledImg = styled.img<{ checked: boolean }>`
  cursor: pointer;
  border-radius: 20px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));

  ${({ checked }) =>
    checked &&
    css`
      filter: brightness(50%) drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
    `}
`;

const StyledCheckbox = styled.input`
  width: 0;
  height: 0;
`;

const StyledCheckIcon = styled(AiOutlineCheckCircle)<{ checked: boolean }>`
  z-index: 1;
  width: 80px;
  height: 80px;
  color: #22c55e;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const UserName = styled.p`
  font-size: 12px;
  font-weight: 800;
`;
