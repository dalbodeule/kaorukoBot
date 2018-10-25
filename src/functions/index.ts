// command
import commandPing from './command_ping'
import commandServer from './command_server'
import commandUptime from './command_uptime'

// message
import messageLogger from './message_logger'

const modules: {
  [index: string]: any
} = {
  commandPing,
  commandServer,
  commandUptime,
  messageLogger
}

export default modules
