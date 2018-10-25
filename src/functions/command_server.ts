import * as Discord from 'discord.js'
import { Logger as loggerType } from 'log4js';
import { message as Message } from '../functionBase'

export default class CommandServer extends Message {
  constructor (client: Discord.Client, PREFIX: string, logger: loggerType) {
    super(client, PREFIX, logger)
  }
  
  protected async module(msg: Discord.Message) {
    if (msg.content === this.PREFIX + 'server'
      && !msg.author.bot) {
      let author = msg.member || msg.author
      let serverid = (msg.guild ? msg.guild.id : 'private')

      try {
        this.logger.info(`command: server, userid: ${author.id}, ` +
          `guild: ${serverid}, type: pending`)

        msg.reply(`이 서버는 #${this.client.shard.id} ` +
          `서버로 돌아가고 있습니다.`)

        this.logger.info(`command: server, userid: ${author.id}, ` +
          `guild: ${serverid}, type: success`)
      } catch (e) {
        this.logger.info(`command: server, userid: ${author.id}, ` +
          `guild: ${serverid}, type: error`)
        this.logger.debug(e)
      }
    }
  }
}

