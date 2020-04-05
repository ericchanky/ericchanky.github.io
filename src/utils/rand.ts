import { colors }from '@material-ui/core'

export const colorPool = [
  colors.red[200],
  colors.red.A200,
  colors.red.A700,
  colors.pink[300],
  colors.pink[500],
  colors.pink.A400,
  colors.amber[800],
  colors.purple[200],
  colors.purple[300],
  colors.purple[600],
  colors.purple.A200,
  colors.purple.A400,
  colors.deepPurple[400],
  colors.deepPurple[500],
  colors.deepPurple.A200,
  colors.deepPurple.A700,
  colors.indigo[600],
  colors.indigo.A200,
  colors.indigo.A400,
  colors.indigo.A700,
  colors.blue[500],
  colors.blue.A700,
  colors.lightBlue[600],
  colors.lightBlue.A700,
  colors.cyan[800],
  colors.cyan.A200,
  colors.teal[700],
  colors.teal[800],
  colors.teal.A400,
  colors.green.A700,
  colors.lime[200],
  colors.lime[400],
  colors.yellow[700],
  colors.yellow[900],
  colors.yellow.A200,
  colors.orange[500],
  colors.orange[800],
  colors.orange.A700,
  colors.deepOrange[200],
  colors.deepOrange[500],
]

export const rand = (n: number) => {
  return Math.floor(Math.random() * n)
}

export const take = <T>(list: T[]) => {
  return list[rand(list.length)]
}
