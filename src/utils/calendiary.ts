import axios from 'axios'
import qs from 'qs'

export interface CalendiaryPost {
  id: string
  passcode: string
  text: string
  date: number
  created_at: number
  updated_at: number
  active: boolean
  color: string
}

const api = axios.create({
  baseURL: 'https://771rreiwz4.execute-api.ap-southeast-1.amazonaws.com/',
  timeout: 30000,
  paramsSerializer: qs.stringify,
})

// const query = (path: string, data: object) => {
//   return `/proxy?src=${encodeURIComponent(`https://us-central1-calendiary-7192f.cloudfunctions.net${path}?data=${btoa(JSON.stringify(data))}`)}`
// }

export const createPost = (body: CalendiaryPost) => api.post('/calendiaries', body)
// export const updatePost = ({ id, ...body }: CalendiaryPost) => api.put(`/calendiaries/${id}`, body)
export const getPosts = (passcode: string, start: number, end: number) => api.get<{ calendiaries: CalendiaryPost[] }>('/calendiaries', { params: { start, end, passcode } })
