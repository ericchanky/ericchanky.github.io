import { api } from './api'

export interface SecretPassProps {
  id: string
  passcode: string
  name: string
  secret: string
}

export const createSecret = (body: SecretPassProps) => api.post('/secretpasses', body)
export const getSecrets = (passcode: string) => api.get<{ secrets: SecretPassProps[] }>('/secretpasses', { params: { passcode } })
