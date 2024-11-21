const { createProxyMiddleware } = require("http-proxy-middleware");
// const express = require("express");
// const app = express();

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

// app.use(
//   "/backend",
//   createProxyMiddleware({
//     target: "http://localhost:65535",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/backend": "",
//     },
//   })
// );
