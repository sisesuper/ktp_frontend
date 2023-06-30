 import axios from "axios";
 axios.defaults.withCredentials=true

class Axios {
    constructor() {
        this.baseUrl = 'http://localhost:8090';
        // this.baseUrl = 'http://192.168.137.27:8090';
        // this.baseUrl = 'http://192.168.31.231:8090';
        this.timeout = 30000;
    }
    setInterceptors = (instance, url) => {
        instance.interceptors.request.use((config) => {
            console.log(url)
            config.headers.token =  JSON.parse(sessionStorage.getItem("token"));
            config.headers.captcha =  JSON.parse(sessionStorage.getItem("captcha"));
            return config;
        }, err => Promise.reject(err));

        instance.interceptors.response.use((response) => {
            if (response.data.code) { // 响应错误码处理
                switch (response.data.code){
                    case 200: break
                    default:alert(response.data.message)
                }
                return response.data;
            }
            return response.data;
        }, (err) => {
            if (err.response) { // 响应错误码处理
                switch (err.response.status) {
                    case '401':
                        // todo: handler server forbidden error
                        break;
                    // todo: handler other status code
                    default:
                        break;
                }
                return Promise.reject(err.response);
            }
            return Promise.reject(err);
        });
    }
    request(options) {
        const instance = axios.create();
        // 每次请求都会创建新的axios实例。
        const config = { // 将用户传过来的参数与公共配置合并。
            ...options,
            baseURL: this.baseUrl,
            timeout: this.timeout,
            withCredentials:true,
        };
        // 配置拦截器，支持根据不同url配置不同的拦截器。
        this.setInterceptors(instance, options.url);
        return instance(config); // 返回axios实例的执行结果
    }

}

export default new Axios();