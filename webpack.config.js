const merge = require("webpack-merge");
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const parts = require("./webpack.parts");


const PATHS = {
    app: path.join(__dirname, "src"),
    build: path.join(__dirname, "dist"),
};


const commonConfig = merge(

    {
        plugins: [
            new HtmlWebpackPlugin({
                title: "泛微-协同软件的精英团队",
            }),
        ],
    },
    parts.loadJavaScript({ include: PATHS.app }),
    parts.clean(PATHS.build),

    // {
    //     entry: {
    //         main: path.join(__dirname, "src/index.js"),
    //         another: path.join(__dirname, "src/index2.js"),
    //     },
    //     output: {
    //         filename: '[name].js',
    //         path: __dirname + '/dist'
    //     }
    // },

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
            name: "[name].[ext]",
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
        },
    },

    // parts.attachRevision(),
    parts.minifyJavaScript(),


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
    if (mode === "production") {
        return merge(commonConfig, productionConfig, {mode});
    }
    return merge(commonConfig, developmentConfig, {mode});
};
