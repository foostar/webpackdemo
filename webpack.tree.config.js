var webpack = require("webpack")
var htmlWebpackPlugin = require("html-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
function isProduction (config) {
    if(!process.env.NODE_ENV){
        config.plugins.shift()
        config.plugins[0] = new ExtractTextPlugin('common.css')
    }
    return config
};
var config = {
    entry:{
        index:'./tree/js/index',
        home:'./tree/js/home',
        list:'./tree/js/list'
    },
    output:{
        path:"./dist",
        filename:"js/[name].js",
    },
    module:{
        loaders:[
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css'),
                exclude:"/node_modules/"
            },
            {test: /\.less$/i, loader: ExtractTextPlugin.extract(['css','less'])},
            {test: require.resolve('jquery'), loader: 'expose?$'},
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "tree/js"),
                loader: 'babel-loader',
                query: {
                  presets: ['es2015']
                }
            },
            {test: /\.pug$/, loader: "pug-loader",exclude:"/node_modules/"},
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'url-loader?limit=10000&name=./images/[name].[ext]',
                    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, jpgquant:{quality: "65-90", speed: 4}}'
                ],
                exclude:"/node_modules/"
            }
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
        new ExtractTextPlugin('common.css'),
        /*new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),*/
        new htmlWebpackPlugin({
            title:"首页",
            template: './tree/index.html', // Load a custom template 
            inject: 'body' ,
            filename:"index.html",
            chunks:["commons","index"]
        }),
        new htmlWebpackPlugin({
            title:"home页",
            template: './tree/views/home.html', // Load a custom template 
            inject: 'body' ,
            filename:"views/home.html",
            chunks:["commons","home"]
        }),
        new htmlWebpackPlugin({
            title:"list",
            template: './tree/views/list.html', // Load a custom template 
            inject: 'body' ,
            filename:"views/list.html",
            chunks:["commons","list"]
        })
    ],
    resolve:{
        extensions:['','.js',".css",'jsx','.less']  //自动补全识别后缀
    }
}

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'commons', // 将公共模块提取，生成名为`vendors`的chunk
    chunks: Object.keys(config.entry)
}))
isProduction(config)
console.log(process.env.NODE_ENV,config)
module.exports = config
