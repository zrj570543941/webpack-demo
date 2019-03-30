const merge = require("webpack-merge");
const path = require("path");
const glob = require("glob");
const parts = require("./webpack.parts");


const PATHS = {
    app: path.join(__dirname, "src"),
    build: path.join(__dirname, "dist"),
};


const commonConfig = merge(

    parts.loadJavaScript({ include: PATHS.app }),
    parts.clean(PATHS.build),

    {
        output: {
            // Needed for code splitting to work in nested paths
        },
    },

);


const productionConfig = merge(
    parts.extractCSS({
        use: ["css-loader", parts.autoprefix()],
    }),

    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),

    parts.loadImages({
        options: {
            limit: 50000,
            name: "[name].[hash:4].[ext]",
        },
    }),

    parts.generateSourceMaps({ type: "source-map" }),

    {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        chunks: "initial",
                    },
                },
            },
            runtimeChunk: {
                name: "manifest",
            },
        },
    },

    // parts.attachRevision(),
    parts.minifyJavaScript(),

    {
        output: {
            chunkFilename: "[name].[chunkhash:4].js",
            filename: "[name].[chunkhash:4].js",
        },
    },


);
const developmentConfig = merge(
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
    parts.loadImages(),

);
module.exports = mode => {
    // const pages = [
        // parts.page({ title: "Webpack demo" }),
        // parts.page({ title: "Another demo", path: "another" }),
    // ];

    const pages = [
        parts.page({
            title: "Webpack demo",
            entry: {
                app: PATHS.app,
            },
            chunks: ["app",],
        }),
        parts.page({
            title: "Another demo",
            path: "another",
            entry: {
                another: path.join(PATHS.app, "another.js"),
            },
            chunks: ["another"],
        }),
    ];

    const config = mode === "production" ? productionConfig : developmentConfig;

    // return pages.map(page =>
    //     merge(commonConfig, config, page, { mode })
    // );
    // return merge(commonConfig, config, pages, { mode })
    return merge([commonConfig, config, { mode }].concat(pages));
};
