import db from '../table'
import redis from '../_redis'
import * as types from '../../types'

const SUCCESS = true
const LANG_RPEFIX = 'lang:'
const EXPIRE = 60*60*24

class Language {
  static async find (id: string): Promise<types.model.Language> {
    let query = await redis.getAsync(LANG_RPEFIX + id)

    if (query) {
      return {
        id,
        lang: query
      }
    } else {
      let result = await db.Language.findOne({
        where: {
          guildId: id
        },
        raw: true
      })

      if (result && result.lang) {
        redis.setAsync(LANG_RPEFIX + id, result.lang, 'EX', EXPIRE)
      }
      
      return result
    }
  }

  static async create (id: string, lang: string): Promise<boolean> {
    db.Language.create({
      guildId: id,
      lang
    })

    redis.setAsync(LANG_RPEFIX + id, lang, 'EX', EXPIRE)

    return SUCCESS
  }

  static async update (id: string, lang: string): Promise<boolean> {
    await db.Language.update({
      lang
    }, {
      where: {
        guildId: id
      }
    })

    redis.setAsync(LANG_RPEFIX + id, lang, 'EX', EXPIRE)

    return SUCCESS
  }
}

export default Language
