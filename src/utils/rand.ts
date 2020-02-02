export const rand = (n: number) => {
  return Math.floor(Math.random() * n)
}

export const take = <T>(list: T[]) => {
  return list[rand(list.length)]
}
