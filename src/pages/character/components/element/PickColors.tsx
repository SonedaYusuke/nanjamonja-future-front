import styled from 'styled-components';

interface Props {
  selectColor: (color: string) => void;
}

const COLORS = ['#000000', '#EC5F43', '#B1DD8B', '#74A7FF', '#FDFB67', '#78D3F8'];

const ColorPicker = styled.div`
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  border: 4px solid #fff;
`;

const ColorsWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4vw;
  padding: 3vw;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #eee;
`;

export const PickColors = ({ selectColor }: Props) => {
  return (
    <ColorsWrapper>
      {COLORS.map((color) => (
        <button key={color} onClick={() => selectColor(color)}>
          <ColorPicker style={{ backgroundColor: color }}></ColorPicker>
        </button>
      ))}
    </ColorsWrapper>
  );
};
