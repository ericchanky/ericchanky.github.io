import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { create } from 'jss'

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
})

const stylesProviderProps = {
  jss: create({ ...jssPreset(), insertionPoint: 'mui-inject-first' }),
  generateClassName,
}

export default stylesProviderProps
