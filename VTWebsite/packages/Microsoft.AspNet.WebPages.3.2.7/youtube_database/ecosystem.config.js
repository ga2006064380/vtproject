module.exports = {
  apps: [
    {
      name: 'crawler',
      script: './apps/index.js',
      exec_mode: 'cluster',
      instances: 1,
      error_file: './logs/app-err.log',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
