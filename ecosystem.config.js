module.exports = {
	apps: [
		{
			name: "ezship-global-mobile",
			script: "yarn",
			// Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
			autorestart: true,
			// enable watch & restart feature, if a file change in the folder or subfolder, your app will get reloaded
			watch: false, //["public", "serverDist"],
			env: {
				NODE_ENV: "development",
			},
			env_production: {
				NODE_ENV: "production",
			},
			// Mode to start your app, can be “cluster” or “fork”, default fork
			exec_mode: "cluster",
			// default to true, [enable/disable source map file]
			source_map_support: true,
			// Make a difference instance between process
			// See https://pm2.keymetrics.io/docs/usage/environment/#specific-environment-variables
			instance_var: "INSTANCE_ID",
			error_file: "logs/pm2/err.log",
			out_file: "logs/pm2/out.log",
			log_file: "logs/pm2/combined.log",
			time: true,
			merge_logs: true,
			max_memory_restart: "300M",
		},
	],
	deploy: {
		production: {},
	},
};
