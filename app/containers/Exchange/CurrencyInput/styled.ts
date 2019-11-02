import styled from 'styled-components';

export const InputLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface InfoProps {
  isTop: boolean;
}
export const Info = styled.div<InfoProps>`
  text-align: center;
  padding-bottom: 10px;

  ${props =>
    props.isTop &&
    `
    opacity: 0.6;
    transform: scale(0.6);
  `}
`;

export const Amount = styled.span`
  display: inline-block;
  font-weight: 700;
  font-size: 32px;
  margin-left: 15px;
`;

export const Fraction = styled.span`
  font-size: 24px;
`;

export const Description = styled.span`
  display: block;
  font-size: 12px;
  opacity: 0.6;
  margin: 0px 15px;
`;

export const Input = styled.input`
  border: none;
  font-weight: 700;
  background: transparent;
  color: #fff;
  text-align: right;
  font-size: 32px;
  outline: none;
  margin-right: 15px;
`;
