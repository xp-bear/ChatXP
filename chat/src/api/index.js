//引入axios
import service from "@/utils/axios";

// 获取chatGPT 对话内容
export const chatGPTApi = (data) => service.post("/api", data);
