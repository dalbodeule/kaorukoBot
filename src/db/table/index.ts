import mysql from '../_mysql'

import * as guilds from './guild'
import * as leaveMessage from './leaveMessage'
import * as welcomeMesasge from './welcomeMessage'
import * as language from './language'

const defineTable = (tableConfig: { name: any, table: any, config: any }): any => {
  const { name, table, config } = tableConfig
  return mysql.define(name, table, config)
}

const setFK = (origin: any, foreignKey:string, target: any, onUpdate:string, onDelete:string): void => {
  origin.hasMany(target, { foreignKey,
    onDelete: onDelete,
    onUpdate: onUpdate
  })
}

const tables = {
  Guild: defineTable(guilds),
  Language: defineTable(language),
  LeaveMessage: defineTable(leaveMessage),
  WelcomeMessage: defineTable(welcomeMesasge)
}

setFK(tables.Guild, 'guildId', tables.Language,
  'cascade', 'cascade')
setFK(tables.Guild, 'guildId', tables.LeaveMessage,
  'cascade', 'cascade')
setFK(tables.Guild, 'guildId', tables.WelcomeMessage,
  'cascade', 'cascade')

mysql.sync()

export default tables