import { addHours, isBefore } from 'date-fns'
import { computed, observable, when } from 'mobx'
import { date } from 'mobx-sync'

import { rand } from '../utils/rand'
import BaseStore from './BaseStore'

interface PhraseItem {
  phrase: string
  author: string
}

class Phrase extends BaseStore {
  @observable public list = observable.array<PhraseItem>([], { name: 'list' })
  @date @observable public nextUpdate = new Date
  @observable public index = 0
  @date @observable public nextPhrase = new Date

  constructor() {
    super()
    when(
      () => isBefore(this.nextPhrase, this.now),
      () => this.set({
        index: rand(this.list.length),
        nextPhrase: addHours(new Date, 1),
      }),
    )
  }

  @computed
  public get item() {
    if (this.list.length === 0) { return null }
    return this.list[this.index]
  }
}

export default Phrase

export const phrase = new Phrase
