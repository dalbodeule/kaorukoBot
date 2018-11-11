export default interface model {
  language: {
    find (id: string): Promise<Language>
    create (id: string, lang: string): Promise<boolean>
    update (id: string, lang: string): Promise<boolean>
  },
  leaveMessage: {
    find (id: string): Promise<Message>
    create (id: string, lang: string): Promise<boolean>
    update (id: string, lang: string): Promise<boolean>
  },
  welcomeMessage: {
    find (id: string): Promise<Message>
    create (id: string, lang: string): Promise<boolean>
    update (id: string, lang: string): Promise<boolean>
  },
  guild: {
    create (id: string): Promise<boolean>
    find (id: string): Promise<string>
    delete (id: string): Promise<boolean>
  }
}

export interface Language {
  id: string,
  lang: string
}

export interface Message {
  id: string,
  message: string
}