import { Client, Message} from 'eris'
import * as log4js from 'log4js'

try {
  const config = require('../config.json')  
  const logger = log4js.getLogger()

  const client = new Client(config.token, {
    firstShardID: 0,
    maxShards: 'auto',
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

  client.on('ready', () => {
    logger.info(`Logged in as ${client.user}!`)
    logger.debug('Debug Mode!')
    client.editStatus('online', {
      name: 'thx for using KaorukoBot',
      type: 0
    })
    logger.info(client.guildShardMap)
  });

  client.on('shardReady', (id: number) => {
    logger.info(`shard ready! id: ${id}`)
  })

  client.on('messageCreate', msg => {
    if (msg.content === 'ping') {
      let author = msg.member || msg.author
      logger.info(`@${author.id} ping!`)
      client.createMessage(msg.channel.id, `<@${author.id}> Pong!`)
    }
  });

  client.connect()
} catch (e) {
  console.log(e)
}
