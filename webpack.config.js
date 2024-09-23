const path = require('path');

module.exports = {
    entry: {
        main: ['./dist/main.js']
    },
    output: {
        //path: path.resolve(__dirname, './dist/bundle'),
        path: path.resolve(__dirname, '../server/public/js'),
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'dist/js')
                ],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};