const { createProxyMiddleware } = require('http-proxy-middleware');

 module.exports = app => {
     app.use(
        createProxyMiddleware('/corona/api', {
             target: 'http://localhost:3001/'
         })
     );
 };