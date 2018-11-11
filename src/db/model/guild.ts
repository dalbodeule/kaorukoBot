import db from '../table'
import redis from '../_redis'
import * as types from '../../types';

const SUCCESS = true
const ERROR = false

class Guild {
  static async create (id: string): Promise<boolean> {
    await db.Guild.create({
      id
    })

    return SUCCESS
  }

  static async find (id: string): Promise<string> {
    let result = await db.WelcomeMessage.findOne({
      where: {
        id
      },
      raw: true
    })

    return result.id || ERROR
  }
  static async delete (id: string): Promise<boolean> {
    await db.Guild.destroy({
      where: {
        id
      }
    })

    return SUCCESS
  }
}

export default Guild