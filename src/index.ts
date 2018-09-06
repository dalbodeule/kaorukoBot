import { ShardingManager } from 'discord.js'
import * as log4js from 'log4js'
import * as path from 'path'

try {
  const config = require('../config.json')  
  const logger = log4js.getLogger()

  const manager = new ShardingManager(path.join(__dirname, 'bot.js'), {
    token: config.token
  })

  if (process.env.NODE_ENV === 'production') {
    logger.level = 'INFO'
  } else if (process.env.NODE_ENV === 'development') {
    logger.level = 'DEBUG'
  } else {
    logger.level = 'DEBUG'
    process.env.NODE_ENV = 'development'
  }
  logger.info(`${process.env.NODE_ENV} mode`)
  
  manager.spawn()
  manager.on('launch', shard => logger.info(`Launched shard ${shard.id}`))

  manager.on('message', (shard, msg) => {
    switch (msg.type) {
      case 'info':
        logger.info(`Shard[${shard.id}] : ${msg.message}`)
        break
      case 'debug':
        logger.debug(`Shard[${shard.id}] : ${msg.message}`)
        break
      case 'error':
        logger.error(`Shard[${shard.id}] : ${msg.message}`)
        break
      case 'fatal':
        logger.fatal(`Shard[${shard.id}] : ${msg.message}`)
        break
      case 'warn':
        logger.warn(`Shard[${shard.id}] : ${msg.message}`)
        break
      case 'trace':
        logger.trace(`shard[${shard.id}] : ${msg.message}`)
        break
    }
  })
} catch (e) {
  console.log(e)
}
