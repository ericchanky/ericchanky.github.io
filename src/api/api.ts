import axios from 'axios'
import qs from 'qs'

export const api = axios.create({
  baseURL: 'https://wcuod294c5.execute-api.ap-southeast-1.amazonaws.com/v1',
  timeout: 30000,
  paramsSerializer: qs.stringify,
})
