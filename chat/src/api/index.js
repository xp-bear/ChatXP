//引入axios
import service from "@/utils/axios";

// 获取chatGPT 对话内容
// export const chatGPTApi = (data) => service.post("/api", data);

// 最新gpt接口
export const newGPTApi = (data) => service.post("/api", data);

// 千帆 ERNIE-3.5-8K-0205  聊天模型
// 1.获取token
export const QianFanToken = (data) => service.get("/token", data);
// 2.聊天获取结果
export const QianFanGPTApi = (data) => service.post("/chat", data);
