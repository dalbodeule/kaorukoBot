import { Client } from 'discord.js'
import loggerBase from './logger'

try {
  const config = require('../config.json')
  
  const client = new Client()
  const PREFIX = config.prefix

  const logger = loggerBase(client.shard.send)

  logger.info(`${process.env.NODE_ENV} mode`)

  client.on('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`)
    logger.debug('Debug Mode!')
    client.user.setStatus('online')
    client.user.setActivity(`this server is #${client.shard.id}`, {
      type: 'PLAYING'
    })
  });

  client.on('shardReady', (id: number) => {
    logger.info(`shard ready! id: ${id}`)
  })

  client.on('message', msg => {
    if (msg.content === 'ping' || msg.content === PREFIX + 'ping') {
      let author = msg.member || msg.author
      logger.info(`@${author.id} ping!`)
      msg.reply('Pong!')
    }
  });

  client.login(config.token)
} catch (e) {
  console.log(e)
}
