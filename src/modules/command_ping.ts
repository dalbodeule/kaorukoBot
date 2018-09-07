import { Client } from 'discord.js'
import { loggerType } from '../logger';
import { ModuleFunction } from '.';

const main: ModuleFunction = (client: Client, PREFIX: string, logger: loggerType) => {
  client.on('message', async (msg) => {
    if (msg.content === 'ping' || msg.content === PREFIX + 'ping') {
      let author = msg.member || msg.author
      logger.info(`@${author.id} ping!`)
      msg.reply('Pong!')
    }
  })
}

export default main
