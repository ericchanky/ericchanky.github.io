import crypto from 'crypto'
import { useMemo } from 'react'

export const encrypt = (value: string, token: string) => {
  try {
    // random initialization vector
    const iv = crypto.randomBytes(12)
    // random salt
    const salt = crypto.randomBytes(64)

    // derive key: 32 byte key length - in assumption the masterkey is a cryptographic and NOT a password there is no need for
    // a large number of iterations. It may can replaced by HKDF
    const key = crypto.pbkdf2Sync(token, salt, 2145, 32, 'sha512')
    // AES 256 GCM Mode
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
    // encrypt the given text
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()])
    // extract the auth tag
    const tag = cipher.getAuthTag()

    // generate output
    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64')
  } catch {
    return null
  }
}

export const decrypt = (data: string, token: string) => {
  try {
    const bData = Buffer.from(data, 'base64')

    // convert data to buffers
    const salt = bData.slice(0, 64)
    const iv = bData.slice(64, 76)
    const tag = bData.slice(76, 92)
    const text = bData.slice(92)

    // derive key using; 32 byte key length
    const key = crypto.pbkdf2Sync(token, salt, 2145, 32, 'sha512')

    // AES 256 GCM Mode
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(tag)

    // encrypt the given text
    const decrypted = decipher.update(text, 'binary', 'utf8') + decipher.final('utf8')

    return decrypted
  } catch {
    return null
  }
}

export const useEncryptedData = <T, >(data: string | null, token: string, init: T): T => {
  const decrypted = useMemo(() => {
    if (!data) { return null }
    return decrypt(data, token)
  }, [data, token])
  if (!decrypted) { return init }
  return JSON.parse(decrypted)
}
