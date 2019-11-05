import React from 'react';
import { CaretLeftOutline } from '@ant-design/icons';
import { Cell, Container, TabText, Low } from './styled';
import { Icon } from 'components/Icon';
import messages from 'containers/Exchange/messages';
import { FormattedMessage } from 'react-intl';
import { withRouter, RouteComponentProps } from 'react-router';
import Rate from 'containers/Exchange/Rate';
import { Pocket } from 'containers/App/types';

interface IAppProps extends RouteComponentProps {
  relation: number;
  currencies: Pocket[];
  onExchange: () => void;
}
const Header: React.FC<IAppProps> = ({
  currencies,
  relation,
  onExchange,
  history,
}) => {
  const toPockets = () => history.push('/');

  return (
    <Container>
      <Cell onClick={toPockets}>
        <FormattedMessage {...messages.cancel} />
      </Cell>
      <Cell>
        <Rate type="outgoing" relation={relation} currencies={currencies} />
      </Cell>
      <Cell onClick={onExchange}>
        <FormattedMessage {...messages.exchange} />
      </Cell>
    </Container>
  );
};

export default withRouter(Header);
