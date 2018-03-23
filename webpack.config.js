const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const parts = require("./webpack.parts");
const commonConfig = merge(

    {
        plugins: [
            new HtmlWebpackPlugin({
                title: "泛微-协同软件的精英团队",
            }),
        ],
    },




);


const productionConfig = merge(
    parts.extractCSS({
        use: "css-loader",
    }),
);
const developmentConfig = merge(
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
);
module.exports = mode => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, {mode});
    }
    return merge(commonConfig, developmentConfig, {mode});
};
