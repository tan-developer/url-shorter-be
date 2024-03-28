import * as redisStore from 'cache-manager-redis-store';
import {CacheModule} from '@nestjs/cache-manager'


export const CacheModuler = CacheModule.register({
  isGlobal : true,
  store : redisStore,
  host: "tanhomedevserver.ddns.net",
  port : 3001.,
  no_ready_check: true
}) 
