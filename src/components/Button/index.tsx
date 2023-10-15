import styled from 'styled-components';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  if (variant === 'primary') {
    return <PrimaryButton {...props}>{props.children}</PrimaryButton>;
  }
  if (variant === 'secondary') {
    return <SecondaryButton {...props}>{props.children}</SecondaryButton>;
  }
};

const PrimaryButton = styled.button`
  cursor: pointer;
  background-color: #84cc16;
  padding: 12px 40px;
  color: #fff;
  font-size: 18px;
  border-radius: 100vh;
  font-weight: bold;
  white-space: nowrap;
  &:hover {
    background-color: #65a30d;
    transition: all 0.3s;
  }
`;

const SecondaryButton = styled.button`
  cursor: pointer;
  background-color: #fff;
  border: solid 1px #84cc16;
  color: #84cc16;
  padding: 10px 40px;
  font-size: 18px;
  border-radius: 100vh;
  font-weight: bold;
  &:hover {
    transition: all 0.3s;
    border-color: #65a30d;
    color: #65a30d;
  }
`;
