const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// 使用 body-parser 中间件来解析请求体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// app.all("*", function (req, res, next) {
//   // 相当于域名白名单, 不能写 * ,因为*是通配符 所有网站都可以访问 自己为了玩 用着 也行
//   // 不是本公司网站也能访问 ,那就扯了
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   // 所以可以单独配置白名单,也就是能进行跨域访问的网址
//   // res.setHeader("Access-Control-Allow-Origin",["http://127.0.0.1:5500"]);

//   //...Headers必须的固定值,"content-type"
//   res.setHeader("Access-Control-Allow-Headers", "X-request-With,content-type");
//   // res.setHeader("Access-Control-Allow-Headers","X-request-With");

//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");

//   // 放行/下一步 不能省
//   next();
// });

// 设置请求头referer
// 自定义中间件，设置Referer请求头
// app.use((req, res, next) => {
//   // 检查请求头中是否已经有Referer
//   console.log(req.headers);

//   // if (!req.headers.referer) {
//   // 如果没有，则设置Referer请求头为您希望的值
//   req.headers.referer = "https://ad.aifree.site/api/generate/";

//   // 继续处理下一个中间件或路由处理程序
//   next();
// });

app.get("/", (req, res) => {
  return res.send({
    code: 200,
    msg: "node代理服务器,服务启动成功!",
  });
});
app.get("/token", (req, res) => {
  // 获取get请求的参数
  let grant_type = "client_credentials";
  let client_id = req.query.client_id; //iZ6utvrvGxy5uXlRVjiMwXHJ
  let client_secret = req.query.client_secret; //IQFFoDvKHr8rr7NAdcmgflXKO8Ket3UQ

  axios.get(`https://aip.baidubce.com/oauth/2.0/token?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}`).then((result) => {
    return res.send({
      code: 200,
      msg: "token获取成功!",
      result: result.data.access_token,
    });
  });
  // console.log(result);
});
app.post("/chat", (req, res) => {
  let token = req.body.access_token; //token
  let prompt = req.body.prompt; //提示
  let data = {
    messages: [{ role: "user", content: prompt }],
    system: "你的名字叫做萧兮同学,是一个智能小助手,由熊仔开发,你的主人是徐瑶",
  };
  axios.post(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-3.5-8k-0205?access_token=${token}`, data).then((result) => {
    return res.send({
      code: 200,
      msg: result.data.result,
    });
  });
});

// app.post("/api", createProxyMiddleware({ target: "https://ad.aifree.site/api/generate/", changeOrigin: true, pathRewrite: { "^/api": "" } }));

app.listen(3500, () => {
  console.log("node代理服务器,服务启动成功~ 端口: http://127.0.0.1:3500");
});
