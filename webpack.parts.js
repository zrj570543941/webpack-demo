const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

exports.page = ({
                    path = "",
                    template = require.resolve(
                        "html-webpack-plugin/default_index.ejs"
                    ),
                    title,
                    entry,
                } = {}) => ({
    entry,
    plugins: [
        new HtmlWebpackPlugin({
            filename: `${path && path + "/"}index.html`,
            template,
            title,
        }),
    ],
});

exports.minifyJavaScript = () => ({
    optimization: {
        minimizer: [new UglifyWebpackPlugin({ sourceMap: true })],
    },
});


exports.attachRevision = () => ({
    plugins: [
        new webpack.BannerPlugin({
            banner: new GitRevisionPlugin().version(),
        }),
    ],
});
exports.clean = path => ({
    plugins: [new CleanWebpackPlugin([path])],
});

exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: "babel-loader",
            },
        ],
    },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                include,
                exclude,
                use: {
                    loader: "url-loader",
                    options,
                },
            },
        ],
    },
});

exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        plugins: () => [require("autoprefixer")()],
    },
});

exports.purifyCSS = ({ paths }) => ({
    plugins: [new PurifyCSSPlugin({ paths })],
});

exports.extractCSS = ({include, exclude, use}) => {
    // Output extracted CSS to a file
    const plugin = new ExtractTextPlugin({
        // `allChunks` is needed to extract from extracted chunks as well.
        allChunks: true,
        filename: "[name].[hash:4].css",
    });
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,
                    use: plugin.extract({
                        use,
                        fallback: "style-loader",
                    }),
                },
            ],
        },
        plugins: [plugin],
    };
};

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: "errors-only",
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        open: true,
        overlay: true,
    },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
});