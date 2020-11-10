const webpack = require("webpack")
const path = require("path");
const config = {
    entry: [
        "./src/index.tsx"
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },{
                test: /\.scss$/,
                loaders: [
                    "style-loader", "css-loader", "sass-loader"
                    
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', 
            '.tsx',
            '.js',
            '.scss'
        ]
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        port: 8000
    },
    devtool: "source-map"
};

module.exports = config;