import { ShardClientUtil as Shard } from 'discord.js'

export default (send: Shard['send']): any => {
  return {
    info (message: string): void {
      send({
        type: 'info',
        message
      })
    },

    debug (message: string): void {
      send({
        type: 'debug',
        message
      })
    },

    error (message: string): void {
      send({
        type: 'error',
        message
      })
    },

    fatal (message: string): void {
      send({
        type: 'fatal',
        message
      })
    },

    warn (message: string): void {
      send({
        type: 'warn',
        message
      })
    },

    trace (message: string): void {
      send({
        type: 'trace',
        message
      })
    }
  }
}