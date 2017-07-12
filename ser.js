const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./cfg/dev');
const OpenBrowser = require('open-browser-webpack-plugin');

let port = 9000;

config.plugins.push(new OpenBrowser({url: `http://localhost:${port}`}));

config.entry.unshift(
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/dev-server'
)

const compiler = webpack(config);

new WebpackDevServer(compiler, {
    hot: true,
    contentBase: './src/',
    publicPath: '/assets/'
})
.listen(port)
// 开发环境下，webpack-server会自动到 contentBase 指定的路径下找index.html页面 
//然后前端请求时默认返回index.html
// 开发环境下 webpack会把打包后的文件放到内存的/assets/文件夹下，想读取 /assets/里的文件，
//要设置静态文件目录即publicPath 