module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'source-map';

      config.output.devtoolModuleFilenameTemplate =
      'webpack:///[resource-path]?[hash]';
      

    }
  }
}
