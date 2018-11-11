import * as Discord from 'discord.js'
import { Logger as loggerType } from 'log4js';
import { guildCreate as GuildCreate } from '../functionBase'

export default class EventGuildCreate extends GuildCreate {
  constructor (client: Discord.Client, PREFIX: string, logger: loggerType) {
    super(client, PREFIX, logger)
  }
  
  protected async module(msg: Discord.Guild) {
    await Promise.all([
      this.model.guild.create(msg.id),
      this.model.language.create(msg.id, 'en')
    ])
    this.logger.info(`join '${msg.name}' guild, id: ${msg.id}`)
  }
}
