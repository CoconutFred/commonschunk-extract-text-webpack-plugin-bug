var webpack = require("webpack");
var ExtractPlugin = require("extract-text-webpack-plugin");

var plugins = [
    new ExtractPlugin("bundle.css"), //where content should be piped
    new webpack.optimize.CommonsChunkPlugin({
        name: "main", //move dependencies to our main bundle file
        children: true, //look for dependencies in all children
        minChunks: 2 //how many times a dependency must come up before being extracted
    })
];

module.exports = {
    entry: "./src",
    output: {
        path: "builds/",
        filename: "[name].js",
        chunkFilename: "[name]-[chunkhash].js",
        publicPath: "builds/"
    },
    plugins: plugins,
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: "babel",
                include: __dirname + "/src"
            },
            {
                test: /\.scss$/,
                loader: ExtractPlugin.extract("style", "css!sass")
                //loaders: ["style", "css", "sass"]
            },
            {
                test:/\.css$/,
                loader: ExtractPlugin.extract("css")
            },
            {
                test: /\.html/,
                loader: "html"
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                loader: "url",
                query: {
                    limit: 10000 //encode in base64 url if <10kb, else fallback to file-loader
                }
            }
        ]
    }
};

