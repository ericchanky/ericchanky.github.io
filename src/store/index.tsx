import { observable } from 'mobx'
import { AsyncTrunk, ignore } from 'mobx-sync'
import React from 'react'

import BaseStore from './BaseStore'
import { config } from './config'
import { image } from './image'
import { phrase } from './phrase'

class Store extends BaseStore {
  @observable public config = config
  @observable public phrase = phrase
  @observable public image = image
}

const store = new Store
export const storeContext = React.createContext(store)

export default store

export const persist = () => new Promise((resolve) => {
  const trunk = new AsyncTrunk(store, { storage: localStorage, storageKey: 'store' })
  trunk.init().then(() => resolve())
})
