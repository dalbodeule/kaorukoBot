import * as objectPath from 'object-path'
import * as language from 'languages'
import * as model from '../db'
import * as glob from 'glob-promise'
import * as path from 'path'
import { Logger } from 'log4js'
import { language as Lang } from '../types'

const langs: Lang.Langs = {}

export default class {
  private id: string
  private lang: string
  private logger: Logger
  private ready: boolean

  constructor (logger: Logger) {
    this.id = ''
    this.lang = ''
    this.logger = logger
    this.ready = false
  }

  async set (id: string): Promise<boolean|Error> {
    if (Object.keys(langs).length === 0) {
      this.logger.info('Language: Language not loaded')
      let items = await glob(path.join(__dirname, '..', '..', 'language', 'lang_*.json'))
      items.forEach((value, index, array) => {
        let temp = require(value)
        langs[temp.lang.langname] = temp
        this.logger.info('Language: "' + temp.lang.langname + '" Load complete')
        this.ready = true
      })
    } else {
      this.ready = true
    }

    if (!id) {
      return Error('id is not string')
    } else {
      this.id = id

      let query = await model.language.find(this.id)
      
      if (!query || !query.lang) {
        this.lang = 'en'
        this.logger.debug(`${this.id} ${this.lang}`)
        model.language.create(this.id, this.lang)
      } else {
        this.lang = query.lang
        this.logger.debug(`${this.id} ${this.lang}`)
      }

      return true
    }
  }

  getLocale (): string {
    return this.lang
  }

  async langset (lang: string): Promise<boolean> {
    let isExist = false
    for(let i in Object.keys(langs)) {
      if ((<string>langs[Object.keys(langs)[i]].lang.code)) {
        isExist = true
      }
    }

    if (isExist === false) {
      throw Error(lang + ' is not a valid value')
    }
    try {
      await model.language.update(lang, this.id)
      this.lang = lang
      this.logger.debug({id: this.id, lang: this.lang})
      return true
    } catch (e) {
      throw (e)
    }
  }

  help (code: string): string {
    return (<string>objectPath.get(langs[language.getLanguageInfo(this.lang).name], code + '.name')) + '\n\n' +
      (<string>objectPath.get(langs[language.getLanguageInfo(this.lang).name], code + '.description')) + '\n\n' +
      (<string>objectPath.get(langs[language.getLanguageInfo(this.lang).name], code + '.how'))
  }

  text (code: string): string {
    return (<string>objectPath.get(langs[language.getLanguageInfo(this.lang).name], code))
  }

  getLangList (): Lang.Langs {
    return langs
  }
}