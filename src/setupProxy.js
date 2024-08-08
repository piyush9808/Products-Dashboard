const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://cdn.drcode.ai',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // remove /api prefix
            },
        })
    );
};
