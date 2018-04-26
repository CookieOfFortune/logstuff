const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
    entry: slsw.lib.entries,

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],        
      },

    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js'
    },

    resolve: {
        extensions: [ 
            '.ts', 
            '.tsx', 
            '.js', 
            '.json',
        ],
    },

    target: 'node',

    externals: [
        /aws-sdk/,        
    ],
};