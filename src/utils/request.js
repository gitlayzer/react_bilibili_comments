// 导入 axios 库
import axios from 'axios'

const service = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 设置请求头
        config.headers['Content-Type'] = 'application/json'
        // 设置完成之后返回 config
        return config;
    },
    // 请求错误处理
    (error) => {
        // 对请求错误做些什么, 这里不做处理，直接丢弃错误
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 正则表达式判断 response status 是否为 2xx
        const status = response.status.toString();
        const regex = /^[1234]\d{2}$/
        if (regex.test(status)) {
            return response;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 导出 service 实例
export default service;