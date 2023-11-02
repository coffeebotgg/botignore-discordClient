module.exports = {
	apps: [
		{
			name: "Buildathon-Client",
			script: "./dist/src/client.js",
			instances: 1,
			autorestart: true,
			watch: true,
			max_memory_restart: "1G",
			env: {
				NODE_ENV: "development",
			},
			env_production: {
				NODE_ENV: "production",
			},

			// restart
			min_uptime: "60s",
			max_restarts: 10,
			restart_delay: 5000,

			// logs to be stored under .logs/pm2 folder
			log_date_format: "YYYY-MM-DD HH:mm:ss",
			error_file: "./logs/pm2/error.log",
			pid_file: "./logs/pm2/pid.log",
			out_file: "./logs/pm2/out.log",
			combine_logs: true,
			merge_logs: true,
			log_type: "json",
		},
	],
};
