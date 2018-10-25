import * as Discord from 'discord.js'
import { Logger as loggerType } from 'log4js';
import { message as Message } from '../functionBase'
import { timeFormat } from '../helper'

export default class CommandUptime extends Message {
  constructor (client: Discord.Client, PREFIX: string, logger: loggerType) {
    super(client, PREFIX, logger)
  }
  
  protected async module(msg: Discord.Message) {
    if (msg.content === this.PREFIX + 'uptime' && !msg.author.bot) {
      let author = msg.member || msg.author
      let serverid = (msg.guild ? msg.guild.id : 'private')

      try {
        this.logger.info(`command: uptime, userid: ${author.id}, ` +
          `guild: ${serverid}, type: pending`)

        let time = new timeFormat(process.uptime())

        msg.reply(`아바바! 벌써 ${time.hour}시간 ${time.min}분 ` +
          `${time.sec}초동안 작동했어요!`)

        this.logger.info(`command: uptime, userid: ${author.id}, ` +
          `guild: ${serverid}, type: success`)
      } catch (e) {
        this.logger.info(`command: uptime, userid: ${author.id}, ` +
          `guild: ${serverid}, type: error`)
        this.logger.debug(e)
      }
    }
  }
}
