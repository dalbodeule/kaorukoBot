import * as Discord from 'discord.js'
import { Logger as loggerType } from 'log4js';
import { message as Message } from '../functionBase'
import i18n from '../lang'

export default class CommandGuild extends Message {
  constructor (client: Discord.Client, PREFIX: string, logger: loggerType) {
    super(client, PREFIX, logger)
  }
  
  protected async module(msg: Discord.Message) {
    if (msg.content === this.PREFIX + 'guild' && !msg.author.bot) {
      let author = msg.member || msg.author
      let serverid = (msg.guild ? msg.guild.id : 'private')

      try {
        this.logger.info(`command: guild, userid: ${author.id}, ` +
          `guild: ${serverid}, type: pending`)
        if (serverid === 'private') {
          msg.reply(':exclamation: This feature is only available on the guild.')
        } else {
          let lang = new i18n(this.logger)
          await lang.set(serverid)
          const embed = new Discord.RichEmbed()
            .setTitle(lang.text('command.guild.title'))
            .setImage(msg.guild.iconURL)
            .setColor('#f6c5d3')
            .addField(lang.text('command.guild.name'),
              msg.guild.name)
            .addField(lang.text('command.guild.birthday'),
              msg.guild.createdAt)
            .addField(lang.text('command.guild.membercount'),
              msg.guild.memberCount)
            .addField(lang.text('command.guild.serverloc'),
              msg.guild.region)
            .addField(lang.text('command.guild.lang'),
              lang.getLocale())
          msg.reply(embed)
        }

        this.logger.info(`command: guild, userid: ${author.id}, ` +
          `guild: ${serverid}, type: success`)
      } catch (e) {
        this.logger.info(`command: guild, userid: ${author.id}, ` +
          `guild: ${serverid}, type: error`)
        this.logger.debug(e)
      }
    }
  }
}
