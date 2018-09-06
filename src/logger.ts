export default (process: any): any => {
  return {
    info (message: string): void {
      process.send({
        type: 'info',
        message
      })
    },

    debug (message: string): void {
      process.send({
        type: 'debug',
        message
      })
    },

    error (message: string): void {
      process.send({
        type: 'error',
        message
      })
    },

    fatal (message: string): void {
      process.send({
        type: 'fatal',
        message
      })
    },

    warn (message: string): void {
      process.send({
        type: 'warn',
        message
      })
    },

    trace (message: string): void {
      process.send({
        type: 'trace',
        message
      })
    }
  }
}
