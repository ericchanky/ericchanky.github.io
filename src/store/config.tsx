import { observable } from 'mobx'
import { ignore } from 'mobx-sync'

import BaseStore from './BaseStore'

class Config extends BaseStore {
  @ignore @observable public password = ''
  @observable public theme: 'dark' | 'light' = 'dark'
  @observable public showBackground = false
}

export default Config

export const config = new Config()
