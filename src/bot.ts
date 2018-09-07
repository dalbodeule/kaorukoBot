import { Client } from 'discord.js'
import loggerBase from './logger'
const pidusage = require('pidusage')

try {
  const config = require('../config.json')

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

  client.on('message', msg => {
    if (msg.content === 'ping' || msg.content === PREFIX + 'ping') {
      let author = msg.member || msg.author
      logger.info(`@${author.id} ping!`)
      msg.reply('Pong!')
    } else if (msg.content === PREFIX + 'shard') {
      let author = msg.member || msg.author
      logger.info(`@${author.id} shard!`)
      client.shard.broadcastEval('this.guilds.size')
      .then(results => {
        msg.reply(`${results.reduce((prev, val) => prev + val, 0)} total guilds`)
      })
      .catch(console.error);
    }
  });

  async function processStatus () {
    try {
      let usage = await pidusage(process.pid)
      client.shard.send({
        type: 'status',
        data: {
          memory: ( usage.memory / 1024 / 1024 ),
          cpu: usage.cpu,
          uptime: process.uptime()
        }
      })
    } catch (err) {
      logger.error(err.message)
      logger.trace(err.stack)
    }
  }
  setTimeout(processStatus, 1 * 1000)
  setInterval(processStatus, 10 * 1000)

  client.login(config.token)
} catch (e) {
  console.log(e)
}
