import { defineMessages } from 'react-intl';

export const scope = 'exchange';

export default defineMessages({
  have: {
    id: `${scope}.have`,
    defaultMessage: 'You have',
  },
  exchange: {
    id: `${scope}.exchange`,
    defaultMessage: 'Exchange',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
});
