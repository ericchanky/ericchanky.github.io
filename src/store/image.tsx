import Axios from 'axios'
import { addHours, isBefore } from 'date-fns'
import { shuffle } from 'lodash'
import { action, computed, observable, reaction } from 'mobx'
import uuid from 'uuid/v4'

import albumList from '../utils/list.json'
import { take } from '../utils/rand'
import BaseStore from './BaseStore'

export interface ImageItem {
  id: string
  url: string
  width: number,
  height: number,
  mimeType: string,
  data?: string | null,
}

const api = Axios.create({
  baseURL: 'https://dzway.herokuapp.com',
  timeout: 30000,
})

class Image extends BaseStore {
  @observable public list = observable.array<ImageItem>([])
  private auth = { token: '', expiry: new Date }
  @observable private albumId = ''
  private password = ''
  private preload = 0
  private subfix: 'w2048' | 'dv' = 'w2048'

  public constructor() {
    super()
    reaction(() => [this.albumId, this.list.length] as [string, number], ([id, length]) => {
      if (length < 10) {
        this.fetch(id, null)
      }
    }, { delay: 2000 })
  }

  @action.bound
  public setItem(id: string, data: string) {
    const i = this.list.findIndex((l) => l.id === id)
    if (i > -1) {
      this.list[i].data = data
    }
  }

  @action.bound
  public next(evt?: HammerInput) {
    if (evt && evt.velocity < 0.7 && evt.velocity > -0.7) {
      // prevent false swipe
      return
    }
    this.list.replace(this.list.slice(1))
  }

  @action.bound
  public init( { password, preload = 5, title, subfix = 'w2048' }: { password: string, preload: number, title?: keyof typeof albumList, subfix?: 'w2048' | 'dv' }) {
    this.password = password
    this.preload = preload
    this.subfix = subfix
    this.albumId = this.getAlbumId(title)
  }

  @computed
  public get first() {
    return this.list.find((_, i) => i === 0) || null
  }

  @computed
  public get second() {
    return this.list.find((_, i) => i === 1) || null
  }

  private async fetchAuth() {
    const res = await api.post('/auth')
    this.auth = { token: `${res.data.token_type} ${res.data.access_token}`, expiry: addHours(new Date, 1) }
  }

  private async fetch(albumId: string, nextPageToken: string | null) {
    if (nextPageToken === '') { return }
    if (!albumId) { return }

    if (isBefore(this.auth.expiry, new Date) || this.auth.token === '') {
      await this.fetchAuth()
    }

    try {
      const res = await api.post('/images', {
        access_token: this.auth.token,
        album_id: albumId,
        page_token: nextPageToken || '',
      }, {
        headers: {
          'x-dzway-pwd': this.password,
        },
      })

      if (albumId !== this.albumId) {
        return // force stop due to changed album
      }

      this.list.replace([
        ...this.list.slice(0, this.preload),
        ... shuffle(this.list.slice(this.preload).concat(res.data.mediaItems.map((item: any) => ({
          id: uuid(),
          url: `${item.baseUrl}=${this.subfix}`,
          width: Number(item.mediaMetadata.width),
          height: Number(item.mediaMetadata.height),
          mimeType: item.mimeType,
          data: null,
        })))),
      ])

      await this.fetch(albumId, res.data.nextPageToken || '')
    } catch (err) {
      await this.fetchAuth()
      await this.fetch(albumId, nextPageToken)
    }
  }

  private getAlbumId(title?: keyof typeof albumList) {
    if (title && albumList[title]) {
      return albumList[title]
    }
    const keys = Object.keys(albumList).filter((n) => /GirlPic\d{4}/.test(n)) as (keyof typeof albumList)[]
    const album = take(keys)
    return albumList[album]
  }
}

export default Image

export const image = new Image
