import { shuffle } from 'lodash'

const salt = 'ybfDNvPQJz5kTncAY2MWFs8ueiSw4BpLX6GqKx3h9trUZgVRdEC1am7H0'

const sort = <T>(arr: T[], cb: (a: T, b: T) => number) => {
  const nArr = arr.slice()
  for (let i = 0; i < nArr.length; i++) {
    for (let j = i+1; j < nArr.length; j++) {
      if (cb(nArr[i], nArr[j]) > 0) {
        [nArr[i], nArr[j]] = [nArr[j], nArr[i]]
      }
    }
  }
  return nArr
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

  const newSalt = sort(s.split(''), (a, b) => {
    return ((a.charCodeAt(0) * b.charCodeAt(0)) % n) - a.charCodeAt(0)
  }).join()

  return newSalt
}

export const tokenize = (p: string, ctx = '', s = salt) => {
  const seq = p.split('').map((w) => {
    return w.charCodeAt(0)
  }).join('')

  const f = pick(Number(seq), randomSalt(ctx, s))
  const i = Math.floor(f.length * 0.618)
  return f.slice(0, i) + '.' + f.slice(i)
}
