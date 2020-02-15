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
  @observable public current = { index: 0, next: new Date }

  constructor() {
    super()
    when(
      () => isBefore(this.current.next, new Date),
      () => this.set({
        current: { index: rand(this.list.length), next: addHours(new Date, 1) },
      }),
    )
  }

  @computed
  public get item() {
    if (this.list.length === 0) { return null }
    return this.list[this.current.index]
  }
}

export default Phrase

export const phrase = new Phrase
