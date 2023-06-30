import Vue from "vue";
import VueRouter from "vue-router";
import home from "@/views/perLogin/Home";
import productFunction from "@/views/perLogin/ProductFunction";
import mechanism from "@/views/perLogin/Mechanism";
import cooperation from "@/views/perLogin/Cooperation";
import vipPower from "@/views/perLogin/VipPower";
import helpCenter from "@/views/perLogin/HelpCenter";
import main from "@/views/perLogin/Main";
import aboutUs from "@/views/perLogin/AboutUs";
import clauseService from "@/views/perLogin/ClauseService";
import productDynamic from "@/views/perLogin/ProductDynamic";
import downloadbrowse from "@/views/perLogin/DownloadBrowse";
import regist from "@/views/perLogin/Regist";
import login from "@/views/perLogin/Login";
import contactktp from "@/views/perLogin/Contactktp";
import Main from "@/views/afterLogin/Main";
import store from "@/store";
import setting from "@/views/afterLogin/Setting";
import myLesson from "@/views/afterLogin/MyLesson";
import courseDetail from "@/views/afterLogin/CourseDetail";
import lessonLearning from "@/views/afterLogin/LessonLearning";
import gradeManagement from "@/views/afterLogin/GradeManagement";
import courseIntroduction from "@/views/afterLogin/CourseIntroduction";
import semesteAnalysis from "@/views/afterLogin/SemesteAnalysis";
import workDetail from "@/views/afterLogin/WorkDetail";
import messagePage from "@/views/afterLogin/MessagePage";


Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/homePage',
            component: main,
            children: [
                {
                    path: '/homePage',
                    component: home,
                },
                {
                    path: '/productFunction',
                    component: productFunction,
                },
                {
                    path: '/mechanism',
                    component: mechanism,
                },
                {
                    path: '/cooperation',
                    component: cooperation,
                },
                {
                    path: '/vipPower',
                    component: vipPower,
                },
                {
                    path: '/helpCenter',
                    component: helpCenter,
                },
                {
                    path: '/aboutUs',
                    component: aboutUs,
                },
                {
                    path: '/clauseService',
                    component: clauseService,
                },
                {
                    path: '/productDynamic',
                    component: productDynamic,
                },
                {
                    path: '/downloadbrowse',
                    component: downloadbrowse,
                },
                {
                    path: '/contactktp',
                    component: contactktp,
                }
            ]
        },
        {
            path: '/main',
            component: Main,
            children: [
                    {
                        path: '/',
                        component: myLesson,
                        name: 'myLesson',
                        meta:{
                            title:'我的课程',
                        }
                    },
                  {
                    path: '/courseDetail',
                    component: courseDetail,
                    name: 'courseDetail',
                    children: [{
                        path: '/',
                        name: 'learning',
                        component: lessonLearning,
                        meta:{
                            title:'课程内容'
                        },
                    },
                        {
                            path: '/analyse',
                            name: 'analyse',
                            component: semesteAnalysis,
                            meta:{
                                title:'课程内容'
                            },
                        },
                        {
                            path: '/scores',
                            name: 'scores',
                            component: gradeManagement,
                            meta:{
                                title:'课程内容'
                            },
                        },
                        {
                            path: '/introduction',
                            name: 'introduction',
                            component: courseIntroduction,
                            meta:{
                                title:'课程内容'
                            },
                        }]
                }
                , {
                    path: '/workDetail',
                    component: workDetail,
                    name: 'workDetail',
                    meta:{
                        title:'作业详情'
                    },
                }
                , {
                    path: '/userSetting',
                    component: setting,
                    name: 'setting',
                    meta:{
                        title:'用户设置',
                    }
                }
                , {
                    path: '/message',
                    component: messagePage,
                    name: 'messagePage',
                    meta:{
                        title:'通知',
                    }
                }
            ]
        },
        {
            path: '/login',
            component: login,
            name: 'login'
        },
        {
            path: '/regist',
            component: regist,
        },
    ]

})
router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem("token")) {
        store.dispatch('checkToken')
    } else if (JSON.parse(localStorage.getItem('autoLogin'))) {
        sessionStorage.setItem('token', localStorage.getItem('token'))
        store.dispatch('checkToken')
    }
    store.commit('show', to.name === 'myLesson')
    next()
})

export default router