const withSass = require('@zeit/next-sass');
module.exports = withSass({
  /* config options here */
  includePaths: ['styles', 'node_modules']
});
