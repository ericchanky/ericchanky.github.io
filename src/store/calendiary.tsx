import { observable } from 'mobx'

import BaseStore from './BaseStore'

class Calendiary extends BaseStore {
  @observable wallpaperCode = ''
}

export default Calendiary

export const calendiary = new Calendiary
