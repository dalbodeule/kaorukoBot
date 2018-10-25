import { Client } from 'discord.js'
import loggerBase from './logger'
import functions from './functions'
import * as functionBase from './functionBase'
import { config, Config } from './config'
const pidusage = require('pidusage')

try {
  const client = new Client({
    fetchAllMembers: true
  })
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

  client.on('guildCreate', msg => {
    logger.info(`join '${msg.name}' guild, id: ${msg.id}`)
  })

  client.on('guildDelete', msg => {
    logger.info(`exit '${msg.name}' guild, id: ${msg.id}`)
  })

  const loadFunctions: {
    [index: string]:
      functionBase.message
  } = {}

  for (let key in functions) {
    loadFunctions[key] = new functions[key](client, PREFIX, logger)
    loadFunctions[key].run()

    logger.debug('function ' + key + 'successfuly load')
  }

  async function processStatus () {
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
  setInterval(processStatus, 60 * 1000)

  client.login(config.apiKey.discord)
} catch (e) {
  console.log(e)
}
