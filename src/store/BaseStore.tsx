import { action, observable } from 'mobx'
import { date } from 'mobx-sync'

export default class BaseStore {
  constructor() {
    setInterval(() => {
      this.set({ now: new Date() })
    }, 1000)
  }

  @date @observable now = new Date()

  @action.bound
  set<K extends keyof this>(data: Pick<this, K>) {
    Object.assign(this, data)
  }
}
