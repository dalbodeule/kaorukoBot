import { Client } from 'discord.js'
import { loggerType } from '../logger';
import { ModuleFunction } from '.'

const main: ModuleFunction = (client: Client, PREFIX: string, logger: loggerType): void => {
  client.on('message', msg => {
    if (msg.content === PREFIX + 'server') {
      let author = msg.member || msg.author
      logger.info(`@${author.id} shard!`)
      msg.reply(`이 서버는 #${client.shard.id} 서버로 돌아가고 있습니다.`)
    }
  })
}

export default main
