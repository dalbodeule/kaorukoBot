// command
import commandGuild from './command_guild'
import commandPing from './command_ping'
import commandUptime from './command_uptime'

// event
import eventGuildCreate from './event_guildCreate'
import eventGuildDelete from './event_guildDelete'

// message
import messageLogger from './message_logger'

const modules: {
  [index: string]: any
} = {
  commandGuild,
  commandPing,
  commandUptime,
  eventGuildCreate,
  eventGuildDelete,
  messageLogger
}

export default modules
