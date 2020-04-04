import { colors }from '@material-ui/core'

export const colorPool = [
  colors.red.A700,
  colors.pink[500],
  colors.amber[800],
  colors.purple[600],
  colors.purple[300],
  colors.deepPurple[500],
  colors.deepPurple.A700,
  colors.indigo[600],
  colors.indigo.A700,
  colors.cyan[800],
  colors.teal[700],
  colors.teal[800],
  colors.green.A700,
  colors.yellow[700],
  colors.yellow[900],
  colors.orange[500],
  colors.orange[800],
  colors.orange.A700,
]

export const rand = (n: number) => {
  return Math.floor(Math.random() * n)
}

export const take = <T>(list: T[]) => {
  return list[rand(list.length)]
}
