import styled from 'styled-components';

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
  margin: 0 5px;
`;

export const Fraction = styled.span`
  font-size: 24px;
`;

export const Description = styled.span`
  display: block;
  text-transform: uppercase;
  font-size: 12px;
  opacity: 0.6;
`;
