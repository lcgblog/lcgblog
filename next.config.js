const webpack = require("webpack");

const assetPrefix = "";

const moduleExports = {
	inlineImageLimit: 20480,
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.node = {
				fs: "empty",
			};
		}
		config.plugins.push(
			new webpack.DefinePlugin({
				__SERVER__: isServer
			})
		);
		config.module.rules.push(
			{
				issuer: {
					// nextjs already handles url() in css/sass/scss files
					test: /\.\w+(?<!(s?c|sa)ss)$/i,
				},
				test: /\.(jpe?g|png|gif)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							esModule: false,
							limit: 20480,
							name: "images/[name]_[hash:base64:5].[ext]",
							publicPath: `${assetPrefix}/_next/static/images/`,
							outputPath: "static/images/",
						},
					},
				],
			},
			{
				test: /\.svg$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							esModule: false,
							limit: 10240,
							name: "images/[name]_[hash:base64:5].[ext]",
							publicPath: `${assetPrefix}/_next/static/images/`,
							outputPath: "static/images/",
						},
					},
				],
			}
		);
		return config;
	},
	assetPrefix: assetPrefix
};

module.exports = moduleExports;

