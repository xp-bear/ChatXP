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

// 设置请求头referer
// 自定义中间件，设置Referer请求头
app.use((req, res, next) => {
  // 检查请求头中是否已经有Referer
  // if (!req.headers.referer) {
  // 如果没有，则设置Referer请求头为您希望的值
  req.headers.referer = "https://ora.ai/embed/75e78e3b-ee5d-4e1b-97c5-76f53af8bc28";
  // }

  // 继续处理下一个中间件或路由处理程序
  next();
});

app.get("/", (req, res) => {
  return res.send({
    code: 200,
    msg: "服务启动成功",
  });
});

app.post("/api", createProxyMiddleware({ target: "https://ora.ai/api/conversation", changeOrigin: true, pathRewrite: { "^/api": "" } }));

app.listen(3500, () => {
  console.log("服务启动成功~ 端口: http://127.0.0.1:3500");
});
