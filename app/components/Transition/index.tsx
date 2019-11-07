import * as React from 'react';
import { RouteComponentProps, Switch, useLocation } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import { Container } from './styled';
import { useSelector } from 'react-redux';

const Transition: React.FC<RouteComponentProps> = ({ children }) => {
  // it is not in app yet

  const location = useSelector(({ router }) => router.location);

  return (
    <Container>
      <CSSTransition key={location.key} classNames="my-node" timeout={500}>
        <Switch location={location}>{children}</Switch>
      </CSSTransition>
    </Container>
  );
};

export default Transition;
