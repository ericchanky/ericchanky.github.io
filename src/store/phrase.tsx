import { observable } from 'mobx'
import { date } from 'mobx-sync'

import BaseStore from './BaseStore'

interface PhraseItem {
  phrase: string
  author: string
}

class Phrase extends BaseStore {
  @observable public list = observable.array<PhraseItem>([], { name: 'list' })
  @date @observable public nextUpdate = new Date
}

export default Phrase

export const phrase = new Phrase
