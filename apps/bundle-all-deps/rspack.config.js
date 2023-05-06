const { composePlugins, withNx } = require('@nx/rspack');

const externals = [
  function (obj, callback) {
    const resource = obj.request;
    const lazyImports = [
      '@nestjs',
      '@nestjs/common',
      '@nestjs/core',
      '@nestjs/mapped-types',
      '@nestjs/microservices',
      '@nestjs/microservices/microservices-module',
      '@nestjs/platform-express',
      '@nestjs/swagger',
      '@newrelic/pino-enricher',
      '@octokit/auth-app',
      'cache-manager',
      'class-transformer',
      'class-transformer/storage',
      'class-validator',
      'express',
    ];
    if (!lazyImports.includes(resource)) {
      return callback();
    }
    try {
      require.resolve(resource);
    } catch (err) {
      callback(null, resource);
    }
    callback();
  },

  // We want to ignore these
  'original-fs', // Context: https://github.com/web-infra-dev/rspack/discussions/3038
  /Debug\/iconv.node$/, // Context: https://github.com/web-infra-dev/rspack/issues/3039
  '@nestjs/websockets/socket-module',
];

// Nx plugins for rspack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the rspack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  config.externals = externals;
  return config;
});
