import { internalHttpClient, ibgeHttpClient } from '../utils/request';

import IbgeService from './ibge';
import UsersService from './users';
import GroupsService from './groups';

export default {
  ibge: IbgeService(ibgeHttpClient),
  users: UsersService(internalHttpClient),
  groups: GroupsService(internalHttpClient),
};
