import axios from 'axios'
import qs from 'qs'

export interface CalendiaryPost {
  id: string
  passcode: string
  text: string
  date: string
  created_at: string
  updated_at: string
  active: boolean
  color: string
}

const api = axios.create({
  baseURL: 'https://tools-server.herokuapp.com/',
  timeout: 30000,
  paramsSerializer: qs.stringify,
})

// const query = (path: string, data: object) => {
//   return `/proxy?src=${encodeURIComponent(`https://us-central1-calendiary-7192f.cloudfunctions.net${path}?data=${btoa(JSON.stringify(data))}`)}`
// }

export const createPost = (body: Omit<CalendiaryPost, 'id'>) => api.post('/calendiaries', body)
export const updatePost = ({ id, ...body }: CalendiaryPost) => api.put(`/calendiaries/${id}`, body)
export const getPosts = (passcode: string, start: Date, end: Date) => api.get(`/calendiaries/${passcode}`, { params: { start, end } })
