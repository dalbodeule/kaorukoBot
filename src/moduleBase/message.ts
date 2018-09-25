import * as Discord from 'discord.js'
import { loggerType } from '../logger';

export default class Message {
  protected client: Discord.Client
  protected PREFIX: string
  protected logger: loggerType

  constructor (client: Discord.Client, PREFIX: string, logger: loggerType) {
    this.client = client
    this.PREFIX = PREFIX
    this.logger = logger
  }

  public run (): void {
    this.client.on('message', (msg) => this.module(msg) )
  }

  protected async module (msg: Discord.Message): Promise<void> {

  }
}