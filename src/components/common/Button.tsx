import styled from "@emotion/styled";
import { colorSystem } from "../../styles/color";

interface ButtonProps {
  bg?: string;
  color?: string;
  hoverBorder?: string;
  hoverBg?: string;
  hoverColor?: string;
}

interface ButtonComponentProps {
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonStyle = styled.button<ButtonProps>`
  cursor: pointer;
  font-family: "Pretendard Variable";
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 30px;
  height: 2.7em;
  transition:
    border 0.3s,
    background-color 0.3s,
    color 0.3s;
  border: 1px solid;
  background-color: ${props => props.bg};
  color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border: 1px solid ${props => props.hoverBorder};
    background-color: ${props => props.hoverBg};
    color: ${props => props.hoverColor};
  }
`;
const MainButtonStyle = styled(ButtonStyle)`
  background-color: ${colorSystem.primary};
  color: ${colorSystem.white};
  &:hover {
    border: 1px solid ${colorSystem.p700};
    background-color: ${colorSystem.p700};
  }
`;
const ActionButtonStyle = styled(ButtonStyle)`
  background-color: ${colorSystem.white};
  color: ${colorSystem.p700};
  &:hover {
    background-color: #d3dce9;
  }
`;
const DeleteButtonStyle = styled(ButtonStyle)`
  background-color: ${colorSystem.error};
  color: ${colorSystem.white};
  border: 1px solid ${colorSystem.error};

  &:hover {
    border: 1px solid #ca2929;
    background-color: #ca2929;
    color: ${colorSystem.white};
  }
`;
const CeoButtonStyle = styled(ButtonStyle)`
  background-color: ${colorSystem.ceo};
  color: ${colorSystem.white};
  &:hover {
    border: 1px solid ${colorSystem.ceo700};
    background-color: ${colorSystem.ceo700};
  }
`;

const CeoActionButtonStyle = styled(ButtonStyle)`
  background-color: ${colorSystem.white};
  color: ${colorSystem.g800};
  border: 2px solid ${colorSystem.ceo};

  &:hover {
    border: 2px solid ${colorSystem.ceo};
    background-color: ${colorSystem.ceo100};
    color: ${colorSystem.black};
  }
`;
const AdminButtonStyle = styled(ButtonStyle)`
  background-color: ${colorSystem.admin};
  color: ${colorSystem.white};
`;

const MainButton: React.FC<ButtonComponentProps> = ({
  label = "버튼",
  onClick,
}) => {
  return <MainButtonStyle onClick={onClick}>{label}</MainButtonStyle>;
};

const ActionButton: React.FC<ButtonComponentProps> = ({
  label = "버튼",
  onClick,
}) => {
  return <ActionButtonStyle onClick={onClick}>{label}</ActionButtonStyle>;
};

const DeleteButton: React.FC<ButtonComponentProps> = ({
  label = "버튼",
  onClick,
}) => {
  return <DeleteButtonStyle onClick={onClick}>{label}</DeleteButtonStyle>;
};

const CeoButton: React.FC<ButtonComponentProps> = ({
  label = "버튼",
  onClick,
}) => {
  return <CeoButtonStyle onClick={onClick}>{label}</CeoButtonStyle>;
};

const CeoActionButton: React.FC<ButtonComponentProps> = ({
  label = "버튼",
  onClick,
}) => {
  return <CeoActionButtonStyle onClick={onClick}>{label}</CeoActionButtonStyle>;
};

const AdminButton: React.FC<ButtonComponentProps> = ({
  label = "버튼",
  onClick,
}) => {
  return <AdminButtonStyle onClick={onClick}>{label}</AdminButtonStyle>;
};

export {
  MainButton,
  ActionButton,
  DeleteButton,
  CeoButton,
  CeoActionButton,
  AdminButton,
};
