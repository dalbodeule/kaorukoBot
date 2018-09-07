import command_ping from './command_ping'
import command_server from './command_server'

import { loggerType } from '../logger';
import { Client } from 'discord.js'

const modules: moduleType =  {
  command_ping,
  command_server
}

export default modules

export interface moduleType {
  [key: string]: ModuleFunction
}

export type ModuleFunction = (client: Client, PREFIX: string, logger: loggerType) => any