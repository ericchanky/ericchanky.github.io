import axios from 'axios'
import qs from 'qs'

export interface CalendiaryPost {
  id: string
  passcode: string
  text: string
  date: string
  createdAt: string
  updatedAt: string
  active: boolean
  color: string
}

const api = axios.create({
  baseURL: 'https://dzway.herokuapp.com/',
  timeout: 30000,
  paramsSerializer: qs.stringify,
})

const query = (path: string, data: object) => {
  return `/proxy?src=${encodeURIComponent(`https://us-central1-calendiary-7192f.cloudfunctions.net${path}?data=${btoa(JSON.stringify(data))}`)}`
}

export const createPost = (data: CalendiaryPost) => api.get(query('/create', data))
export const getPost = (id: CalendiaryPost['id']) => api.get(query('/get', { id }))
export const getAllPost = (passcode: string, start: Date, end: Date) => api.get(query('/getAll', { passcode, start, end }))
