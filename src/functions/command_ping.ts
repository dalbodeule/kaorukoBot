import * as Discord from 'discord.js'
import { loggerType } from '../logger';
import { message as Message } from '../functionBase'

export default class CommandPing extends Message {
  constructor (client: Discord.Client, PREFIX: string, logger: loggerType) {
    super(client, PREFIX, logger)
  }
  
  protected async module(msg: Discord.Message) {
    if (msg.content === 'ping' || msg.content === this.PREFIX + 'ping'
      && !msg.author.bot) {
      let author = msg.member || msg.author
      let serverid = (msg.guild ? msg.guild.id : 'private')

      try {
        this.logger.info(`command: ping, userid: ${author.id}, ` +
          `guild: ${serverid}, type: pending`)

        msg.reply('Pong!')

        this.logger.info(`command: ping, userid: ${author.id}, ` +
          `guild: ${serverid}, type: success`)
      } catch (e) {
        this.logger.info(`command: ping, userid: ${author.id}, ` +
          `guild: ${serverid}, type: error`)
        this.logger.debug(e)
      }
    }
  }
}
