import db from '../table'
import redis from '../_redis'
import * as types from '../../types';

const SUCCESS = true
const PREFIX = 'welcome:'
const EXPIRE = 60*60*24

class Message {
  static async find (id: string): Promise<types.model.Message> {
    let query = await redis.getAsync(PREFIX + id)

    if (query) {
      return {
        id,
        message: query
      }
    } else {
      let result = await db.WelcomeMessage.findOne({
        where: {
          guildId: id
        },
        raw: true
      })

      if (result && result.message) {
        redis.setAsync(PREFIX + id, result.message, 'EX', EXPIRE)
      }
      
      return result
    }
  }

  static async create (id: string, message: string): Promise<boolean> {
    await db.WelcomeMessage.create({
      guildId: id,
      message
    })

    redis.setAsync(PREFIX + id, message, 'EX', EXPIRE)

    return SUCCESS
  }

  static async update (id: string, message: string): Promise<boolean> {
    await db.WelcomeMessage.update({
      message
    }, {
      where: {
        guildId: id
      }
    })

    redis.setAsync(PREFIX + id, message, 'EX', EXPIRE)

    return SUCCESS
  }
}

export default Message
