import * as Discord from 'discord.js'
import { loggerType } from '../logger';
import { message as Message } from '../moduleBase'

export default class MessageLogger extends Message {
  constructor (client: Discord.Client, PREFIX: string, logger: loggerType) {
    super(client, PREFIX, logger)
  }
  
  protected async module(msg: Discord.Message) {
    if (msg.content) {
      let author = msg.member || msg.author
      let serverid = (msg.guild ? msg.guild.id : 'private')

      if (author.id !== this.client.user.id)
        this.logger.debug(`${author.id} chat "${msg.content}" ` +
          `from ${serverid}`)
    }
  }
}

