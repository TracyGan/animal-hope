const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/backend",
    createProxyMiddleware({
      target: "http://localhost:65535",
      changeOrigin: true,
      pathRewrite: { "^/backend": "" },
      logLevel: "debug",
    })
  );
};
