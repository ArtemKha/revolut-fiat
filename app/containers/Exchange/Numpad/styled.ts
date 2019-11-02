import styled from 'styled-components';

export const Container = styled.div`
  width: 320px;
  height: 240px;
  position: relative;
  /* border: 1px solid #fff; */
  margin-top: 0px;
  margin-bottom: 30px;
  color: #fff;
`;

export const Delete = styled.div`
  svg {
    margin-top: -7px;
    max-height: 35px;
  }
`;

export const Numbers = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 0;
  width: 320px;
`;

export const Cell = styled.li`
  font-size: 32px;
  float: left;
  list-style: none;
  text-align: center;
  height: 65px;
  padding-top: 15px;
  width: 33.33%;
  user-select: none;
`;
