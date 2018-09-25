import commandPing from './command_ping'
import commandServer from './command_server'
import messageLogger from './message_logger'

const modules: {
  [index: string]: any
} = {
  commandPing,
  commandServer,
  messageLogger
}

export default modules
