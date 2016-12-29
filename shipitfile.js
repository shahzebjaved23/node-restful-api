module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-pm2')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/github-monitor',
      deployTo: '/home/ubuntu/www',
      repositoryUrl: 'https://kamal-dev@gitlab.com/Shaful/shaful-api.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 4,
      deleteOnRollback: false,
      branch: 'development',
      shallowClone: true
    },
    staging: {
      servers: 'ubuntu@35.166.70.82'
    }
  });

};
