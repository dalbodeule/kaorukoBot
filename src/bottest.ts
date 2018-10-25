import { Client } from 'discord.js'
import * as loggerBase from 'log4js'
import modules from './modules'
import * as moduleBase from './moduleBase'
const pidusage = require('pidusage')

try {
  const config = require('../config.json')

  const client = new Client({
    shardCount: 2,
    shardId: 0,
    fetchAllMembers: true
  })
  const PREFIX = config.prefix

  const logger = loggerBase.getLogger()
  
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
    client.user.setStatus('online')
    client.user.setActivity(`this server is #0`, {
      type: 'PLAYING'
    })
  });

  client.on('shardReady', (id: number) => {
    logger.info(`shard ready! id: ${id}`)
  })

  client.on('guildCreate', msg => {
    logger.info(`join '${msg.name}' guild, id: ${msg.id}`)
  })

  client.on('guildDelete', msg => {
    logger.info(`exit '${msg.name}' guild, id: ${msg.id}`)
  })

  const loadModules: {
    [index: string]:
      moduleBase.message
  } = {}

  for (let key in modules) {
    loadModules[key] = new modules[key](client, PREFIX, logger)
    loadModules[key].run()

    logger.debug('module ' + key + 'successfuly load')
  }

  /* async function processStatus () {
    try {
      let usage = await pidusage(process.pid)
      client.shard.send({
        type: 'status',
        data: {
          memory: ( usage.memory / 1024 / 1024 ).toFixed(4),
          cpu: usage.cpu.toFixed(4),
          uptime: process.uptime().toFixed(2)
        }
      })
    } catch (err) {
      logger.error(err.message)
      logger.trace(err.stack)
    }
  }
  setTimeout(processStatus, 10 * 1000)
  setInterval(processStatus, 60 * 1000) */

  client.login(config.token)
} catch (e) {
  console.log(e)
}
