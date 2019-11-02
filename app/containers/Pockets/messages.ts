import { defineMessages } from 'react-intl';

export const scope = 'pockets';

export default defineMessages({
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Regular fiat money',
  },
  exchange: {
    id: `${scope}.exchange`,
    defaultMessage: 'Exchange',
  },
});
