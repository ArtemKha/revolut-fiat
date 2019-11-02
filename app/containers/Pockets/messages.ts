import { defineMessages } from 'react-intl';

export const scope = 'pockets';

export default defineMessages({
  pockets: {
    id: `${scope}.pockets`,
    defaultMessage: 'Pockets',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Regular fiat money',
  },
  exchange: {
    id: `${scope}.exchange`,
    defaultMessage: 'Exchange',
  },
});
