module.exports = {
  apps: [
    {
      name: "geogas",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 15023 -H 127.0.0.1",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 15023,
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
