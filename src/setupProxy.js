const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        './utils/api',
        createProxyMiddleware({
            target: 'https://cdn.drcode.ai',
            changeOrigin: true,
            pathRewrite: {
                './utils/api': '',
            },
        })
    );
};
