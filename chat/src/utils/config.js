let baseUrl = "";
if (process.env.NODE_ENV == "development") {
  // 开发环境
  baseUrl = "http://150.158.21.251:3500";
} else {
  // 打包环境
  baseUrl = "http://150.158.21.251:3500";
}

export { baseUrl };
