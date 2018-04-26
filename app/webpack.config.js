const path = require('path');

module.exports = {    
    mode: 'development',
    entry: './src/logstuff.tsx',

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
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },

    resolve: {
        extensions: [ 
            '.ts', 
            '.tsx', 
            '.js', 
            '.json',
        ],
    },

};