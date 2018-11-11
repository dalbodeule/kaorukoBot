import * as Discord from 'discord.js'
import { Logger as loggerType } from 'log4js';
import * as model from '../db'
import * as types from '../types'

export default class GuildCreate {
  protected client: Discord.Client
  protected PREFIX: string
  protected logger: loggerType
  protected model: types.model.default

  constructor (client: Discord.Client, PREFIX: string, logger: loggerType) {
    this.client = client
    this.PREFIX = PREFIX
    this.logger = logger
    this.model = model
  }

  public run (): void {
    this.client.on('guildCreate', (msg) => this.module(msg) )
  }

  protected async module (msg: Discord.Guild): Promise<void> {

  }
}