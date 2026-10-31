/**
 * ATOMAK Next.js on dedicated local port 3002.
 * Do not modify existing Quoffa PM2 services.
 */
module.exports = {
  apps: [
    {
      name: "atomak-web",
      cwd: "/var/www/atomakrealestate/app",
      script: "./node_modules/next/dist/bin/next",
      args: "start -p 3002 -H 127.0.0.1",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "600M",
      env: { NODE_ENV: "production" },
    },
  ],
};
