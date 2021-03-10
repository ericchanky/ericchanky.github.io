import { action, computed, observable } from 'mobx'

import { createSecret, getSecrets, SecretPassProps } from '../api/secretpass'
import { encrypt } from '../components/aes'
import BaseStore from './BaseStore'

export interface Suggestion {
  version: string
  context: string
  password: string
  name: string
}

class SecretPass extends BaseStore {
  @observable secrets = observable.array<SecretPassProps>([], { name: 'secrets' })
  @observable selected: string = ''
  @observable data: string | null = null

  @action
  getSecrets = async (passcode?: string) => {
    if (!passcode) { return }
    const res = await getSecrets(passcode)
    this.secrets.replace(res.data.secrets)
  }

  @computed
  get secret() {
    return this.secrets.find((s) => s.id === this.selected)
  }

  createSecret = async (body: SecretPassProps) => {
    await createSecret(body)
    this.getSecrets()
  }

  @action.bound
  setSuggestions(suggestions: Suggestion[], token: string) {
    const data = encrypt(JSON.stringify(suggestions), token)
    if (data) {
      this.data = data
    }
  }
}

export default SecretPass

export const secretpass = new SecretPass()
