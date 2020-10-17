import { api } from './api'

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

export const createPost = (body: CalendiaryPost) => api.post('/calendiaries', body)
export const getPosts = (passcode: string, start: number, end: number) => api.get<{ calendiaries: CalendiaryPost[] }>('/calendiaries', { params: { start, end, passcode } })
