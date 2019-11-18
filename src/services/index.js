import { internalHttpClient, ibgeHttpClient } from '../utils/request';

import UsersService from './users';
import IbgeService from './ibge';

export default {
  users: UsersService(internalHttpClient),
  ibge: IbgeService(ibgeHttpClient),
};
