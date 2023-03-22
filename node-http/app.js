const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());


app.all("*", function (req, res, next) {
  // 相当于域名白名单, 不能写 * ,因为*是通配符 所有网站都可以访问 自己为了玩 用着 也行
  // 不是本公司网站也能访问 ,那就扯了
  res.setHeader("Access-Control-Allow-Origin", "*");
  // 所以可以单独配置白名单,也就是能进行跨域访问的网址
  // res.setHeader("Access-Control-Allow-Origin",["http://127.0.0.1:5500"]);

  //...Headers必须的固定值,"content-type"
  res.setHeader("Access-Control-Allow-Headers", "X-request-With,content-type");
  // res.setHeader("Access-Control-Allow-Headers","X-request-With");

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");

  // 放行/下一步 不能省
  next();
});



app.get("/", (req, res) => {
  return res.send({
    code: 200,
    msg: "服务启动成功",
  });
});

app.post("/api", createProxyMiddleware({ target: "https://api.aigcfun.com/api/v1/text?key=FC71E6C81BE1CB3501", changeOrigin: true, pathRewrite: { "^/api": "" } }));

app.listen(3500, () => {
  console.log("服务启动成功~ 端口: http://127.0.0.1:3500");
});
