import { action, computed, observable } from 'mobx'

import { createSecret, getSecrets, SecretPassProps } from '../api/secretpass'
import BaseStore from './BaseStore'

class SecretPass extends BaseStore {
  @observable secrets = observable.array<SecretPassProps>([], { name: 'secrets' })
  @observable selected: string = ''

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
}

export default SecretPass

export const secretpass = new SecretPass()
