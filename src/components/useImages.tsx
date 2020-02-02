import Axios from 'axios'
import { addHours, isBefore } from 'date-fns'
import { shuffle } from 'lodash'
import React from 'react'
import uuid from 'uuid/v4'

import albumList from '../utils/list.json'
import { take } from '../utils/rand'

const api = Axios.create({
  baseURL: 'https://dzway.herokuapp.com',
  timeout: 30000,
})

const getAlbum = () => {
  const keys = Object.keys(albumList).filter((n) => /GirlPic\d{4}/.test(n)) as (keyof typeof albumList)[]
  const album = take(keys)
  return albumList[album]
}

interface Image {
  id: string
  url: string
  width: number,
  height: number,
}

const useImages = (password: string, preload = 5) => {
  const [auth, setAuth] = React.useState({ token: '', expiry: new Date })
  const [nextPageToken, setNextPageToken] = React.useState<string | null>(null)
  const [albumId, setAlbumId] = React.useState('')
  const [list, setList] = React.useState<Image[]>([])

  const fetchAuth = React.useCallback(async () => {
    const res = await api.post('/auth')
    setAuth({ token: `${res.data.token_type} ${res.data.access_token}`, expiry: addHours(new Date, 1) })
  }, [])

  const fetch = React.useCallback(async () => {
    if (nextPageToken === '') { return }
    if (!albumId) { return }

    if (isBefore(auth.expiry, new Date) || auth.token === '') {
      await fetchAuth()
      return
    }

    const res = await api.post('/images', {
      access_token: auth.token,
      album_id: albumId,
      page_token: nextPageToken || '',
    }, {
      headers: {
        'x-dzway-pwd': password,
      },
    })

    setList((l) => [
      ...l.slice(0, preload),
      ...shuffle(l.slice(preload).concat(res.data.mediaItems.map((item: any) => ({
        id: uuid(),
        url: `${item.baseUrl}=w2048`,
        width: Number(item.mediaMetadata.width),
        height: Number(item.mediaMetadata.height),
      })))),
    ])
    setNextPageToken(res.data.nextPageToken || '')
  }, [albumId, auth.expiry, auth.token, fetchAuth, nextPageToken, password, preload])

  React.useEffect(() => {
    fetch()
  }, [fetch])

  React.useEffect(() => {
    setAlbumId(getAlbum())
  }, [])

  return [list, setList] as [Image[], React.Dispatch<React.SetStateAction<Image[]>>]
}

export default useImages
