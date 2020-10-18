import { shuffle } from 'lodash'

const salt = 'ybfDNvPQJz5kTncAY2MWFs8ueiSw4BpLX6GqKx3h9trUZgVRdEC1am7H0'

const remove = (arr: string[], n: number) => {
  return [...arr.slice(0, n), ...arr.slice(n+1)]
}

const sort = (arr: string[], n: number): string[] => {
  if (arr.length === 0) {
    return []
  }
  const r = n % arr.length
  return [arr[r], ...sort(remove(arr, r), n)]
}

export const generateSalt = (s = salt) => {
  return shuffle(s.split('')).join('')
}

const pick = (n: number, s = salt): string => {
  const r = Math.floor(n / s.length)
  if (r === 0) {
    return s[n % s.length]
  }

  return `${s[n % s.length]}${pick(r, s)}`
}

export const randomSalt = (ctx: string, s = salt) => {
  if (!ctx) {
    return s
  }

  const n = ctx.split('').reduce((acc, cur) => {
    return acc + cur.charCodeAt(0)
  }, 0)

  const newSalt = sort(s.split(''), n).join('')

  return newSalt
}

export const tokenize = (p: string, ctx = '', s = salt) => {
  const seq = p.split('').map((w) => {
    return w.charCodeAt(0)
  }).join('')

  const f = pick(Number(seq), randomSalt(ctx, s))
  const i = Math.floor(f.length * 0.618)

  if (/^#/.test(ctx)) {
    return f
  }

  return f.slice(0, i) + '.' + f.slice(i)
}
