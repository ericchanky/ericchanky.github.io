const salt = 'ybfDNvPQJz5kTncAY2MWFs8ueiSw4BpLX6GqKx3h9trUZgVRdEC1am7H0'

const pick = (n: number): string => {
  const r = Math.floor(n / salt.length)
  if (r === 0) {
    return salt[n % salt.length]
  }

  return `${salt[n % salt.length]}${pick(r)}`
}

export const tokenize = (p: string) => {
  const s = p.split('').map((w) => {
    return w.charCodeAt(0)
  }).join('')

  const f = pick(Number(s))
  const i = Math.floor(f.length * 0.618)
  return f.slice(0, i) + '.' + f.slice(i)
}
