import type { EcosystemConfig } from "pm2";

const config: EcosystemConfig = {
  apps: [
    {
      name: "next-app",
      script: "server.js", // built output from Next.js
      instances: 1,
      exec_mode: "fork", // or 'cluster' for multi-core
    },
  ],
};

export default config;
