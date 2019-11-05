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
}
const Header: React.FC<IAppProps> = ({ currencies, relation, history }) => {
  const toPockets = () => history.push('/');

  return (
    <Container>
      <Cell onClick={toPockets}>
        <FormattedMessage {...messages.cancel} />
      </Cell>
      <Cell>
        <Rate type="outgoing" relation={relation} currencies={currencies} />
      </Cell>
      <TabText>
        <FormattedMessage {...messages.exchange} />
      </TabText>
    </Container>
  );
};

export default withRouter(Header);
