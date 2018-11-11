import * as Discord from 'discord.js'
import { Logger as loggerType } from 'log4js';
import { guildDelete as GuildDelete } from '../functionBase'

export default class EventGuildDelete extends GuildDelete {
  constructor (client: Discord.Client, PREFIX: string, logger: loggerType) {
    super(client, PREFIX, logger)
  }
  
  protected async module(msg: Discord.Guild) {
    await this.model.guild.delete(msg.id)
    this.logger.info(`exit '${msg.name}' guild, id: ${msg.id}`)
  }
}
