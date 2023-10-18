import styled, { css } from 'styled-components';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Card } from '../type';
import { CARD_HEIGHT, CARD_WIDTH } from '../const';

export type CardCheckBoxProps = {
  card: Card;
  checked: boolean;
  handleChange: () => void;
};

const IMAGE_URL = 'http://localhost:5678/api/cards'

export const CardCheckBox = ({ card, checked, handleChange }: CardCheckBoxProps) => {
  return (
    <StyledCardCheckBox>
      <CardWrapper>
        <StyledCheckbox id="cardCheck" type="checkbox" checked={checked} onChange={handleChange} />
        {checked && <StyledCheckIcon checked={checked} />}
        <StyledImg src={`${IMAGE_URL}/${card.uuid}`} width={CARD_WIDTH} height={CARD_HEIGHT} checked={checked} />
      </CardWrapper>
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

const CardWrapper = styled.label`
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
  width: 20px;
  height: 20px;
  color: #22c55e;
  position: absolute;
  right: 0%;
  top: 0%;
  transform: translate(-25%, 25%);
  pointer-events: none;
`;

const UserName = styled.span`
  font-size: 12px;
  font-weight: 800;
`;
