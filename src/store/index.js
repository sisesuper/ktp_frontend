import Vue from 'vue';
import Vuex from 'vuex';
import httpPost from "@/utils/axios/Home";
import router from "@/router";
Vue.use(Vuex);

// 创建一个新的 store 实例
const store = new Vuex.Store({
    state() {
        return {
            login:'',
            user:{},
            show:true
        }
    },
    getters:{
        isLogin: state =>  state.login,
        user: state => state.user,
        show: state => state.show,
    },
    mutations: {
        login(state) {
            state.login=true
        },
        exit(state) {
            state.login=false
        },
        user(state,user){
            state.user = user
        },
        show(state,show){
            state.show=show
        }
    },
    actions:{
        login(context, params){
            httpPost(params, '/login', 'POST').then((res) => {
                if (res.code===200){
                    context.commit('login')
                    sessionStorage.setItem("token",JSON.stringify(res.data))
                    localStorage.setItem("token",JSON.stringify(res.data))
                    localStorage.setItem("autoLogin",JSON.parse(params.autoLogin))
                    alert("登录成功！")
                    router.push('main')
                }
            })
        },
        exit(context){
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            localStorage.setItem("autoLogin",JSON.parse(false))
            router.push({name:'login'})
            context.commit('exit')
        },
        checkToken(context){
            httpPost({}, '/checkToken', 'POST').then((res) => {
                if (res.code===200){
                    context.commit('user',res.data)
                    context.state.login=true
                }else{
                    context.state.login=false
                    localStorage.removeItem('autoLogin')
                    localStorage.removeItem('token')
                    sessionStorage.removeItem("token")
                }
            })
        }
    }
})
export default store