import { internalHttpClient, ibgeHttpClient } from '../utils/request'
import { withErrorHandling } from '../utils/error'

import EventsService from './events'
import IbgeService from './ibge'
import UsersService from './users'
import GroupsService from './groups'

const addTryCatchOnEachServiceAction = service => Object.keys(service).reduce((acc, action) => ({
  ...acc,
  [action]: withErrorHandling(service[action])
}), {})

export default {
  ibge: addTryCatchOnEachServiceAction(IbgeService(ibgeHttpClient)),
  users: addTryCatchOnEachServiceAction(UsersService(internalHttpClient)),
  groups: addTryCatchOnEachServiceAction(GroupsService(internalHttpClient)),
  events: addTryCatchOnEachServiceAction(EventsService(internalHttpClient))
}
