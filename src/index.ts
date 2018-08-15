import * as Discord from 'discord.js'
import * as log4js from 'log4js'

const client = new Discord.Client()
const config = require('../config.json')

const logger = log4js.getLogger()

try {
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
    logger.info(`Logged in as ${client.user.tag}!`)
    logger.debug('Debug Mode!')
  });

  client.on('message', msg => {
    if (msg.content === 'ping') {
      logger.info('ping')
      msg.reply('pong')
    }
  });

  client.login(config.token)
} catch (e) {
  console.log(e)
}
