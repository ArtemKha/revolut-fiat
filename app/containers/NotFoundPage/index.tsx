/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import Background from 'components/Background';
import { Text } from './styled';

export default function NotFound() {
  return (
    <Background>
      <Text>
        <FormattedMessage {...messages.header} />
      </Text>
    </Background>
  );
}
