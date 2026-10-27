module.exports = {
  apps: [{
    name: 'getpaidclients',
    script: './node_modules/next/dist/bin/next',
    args: 'start -p 8000',
    node_args: '--max-old-space-size=1024',
    cwd: '/root/GetPaidClients',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    min_uptime: '15s', // Don't allow rapid-fire restarts
    max_restarts: 5,
    env: {
      NODE_ENV: 'production',
    }
  }]
};
