import React from 'react';
import { CaretLeftOutline } from '@ant-design/icons';
import { Cell, Container, TabText, Low } from './styled';
import { Icon } from 'components/Icon';
import messages from 'containers/Exchange/messages';
import { FormattedMessage } from 'react-intl';
import { withRouter, RouteComponentProps } from 'react-router';
import Rate from 'containers/Exchange/Rate';

interface IAppProps {
  currency?: any;
  // history: {
  //   push: (p: string) => any;
  // };
}
const Header: React.FC<RouteComponentProps<IAppProps>> = ({
  // currency = {},
  history,
}) => {
  const toPockets = () => history.push('/');

  return (
    <Container>
      <Cell onClick={toPockets}>
        <FormattedMessage {...messages.cancel} />
      </Cell>
      <Cell>
        <Rate />
      </Cell>
      <TabText>
        <FormattedMessage {...messages.exchange} />
      </TabText>
    </Container>
  );
};

export default withRouter(Header);
