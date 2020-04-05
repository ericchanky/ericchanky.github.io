/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig()

  config.module.rules = [
    {
      test: /\.mjs$/,
      type: 'javascript/auto',
      use: [],
    },
    ...config.module.rules,
  ]

  config.resolve.alias['react-rte'] = path.resolve('./node_modules/react-rte/lib/RichTextEditor.js')

  actions.replaceWebpackConfig(config)
}
