import { action } from 'mobx'

export default class BaseStore {
  @action.bound
  public set<K extends keyof this>(data: Pick<this, K>) {
    Object.assign(this, data)
  }
}
