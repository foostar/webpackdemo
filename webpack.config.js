var webpack = require("webpack")
var htmlWebpackPlugin = require("html-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin");
function isProduction (config) {
    if(!process.env.NODE_ENV){
        config.plugins.shift()
        config.plugins[0] = new ExtractTextPlugin('../common.css')
    }
    return config
};
var config = {
    entry:{
        index:'./src/index',
        home:'./src/home/home',
        list:'./src/list/list'
    },
    output:{
        path:"./dist/js",
        filename:"[name].js",
    },
    module:{
        loaders:[
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css'),
                exclude:"/node_modules/"
            },
            {test: /\.pug$/, loader: "pug-loader",exclude:"/node_modules/"}
        ]
    },
    devServer: {
        port: 4000
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new ExtractTextPlugin('../common.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['index','home','list']
        }),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),
        new htmlWebpackPlugin({
            title:"首页",
            template: './src/index.html', // Load a custom template 
            inject: 'body' ,
            filename:"../index.html",
            chunks:["commons","index"]
        }),
        new htmlWebpackPlugin({
            title:"home页",
            template: './src/home/home.html', // Load a custom template 
            inject: 'body' ,
            filename:"../views/home.html",
            chunks:["commons","home"]
        }),
        new htmlWebpackPlugin({
            title:"list",
            template: './src/list/list.html', // Load a custom template 
            inject: 'body' ,
            filename:"../views/list.html",
            chunks:["commons","list"]
        })
    ],
    resolve:{
        extensions:['','.js',".css",'jsx']  //自动补全识别后缀
    }
}
module.exports = isProduction(config)
