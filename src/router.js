import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Meta from 'vue-meta'
import Join from "@/views/user/Join.vue";
import Login from "@/views/user/Login.vue";
import Mypage from "@/views/user/MyPage.vue";
import Modify from "@/views/user/Modify.vue";
import Book from "@/views/Book.vue";
import Theme from "@/views/Theme.vue";

//import Apt from '@/views/Apt.vue';
Vue.use(Router);
Vue.use(Meta)

const onlyAuthUser = async (to, from, next) => {
  let token = localStorage.getItem("access-token");
  if (store.state.userInfo == null && token) {
    await store.dispatch("GET_MEMBER_INFO", token);
  }
  if (store.state.userInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    next();
  }
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/contact",
      name: "contact",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Contact.vue")
    },
    {
      path: "/blog",
      name: "blog",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Blog.vue")
    },
    {
      path: "/blog/:id",
      name: "blogPost",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/BlogPost.vue")
    },
    {
      path: "/services",
      name: "services",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Services.vue")
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Portfolio/Portfolio.vue")
    },
    {
      path: "/portfolio/video",
      name: "videoPortfolio",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Portfolio/Video.vue")
    },
    {
      path: "/portfolio/graphic",
      name: "graphicPortfolio",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Portfolio/Graphic.vue")
    },
    {
      path: "/portfolio/web",
      name: "webPortfolio",
      component: () =>
          import( /* webpackChunkName: "about" */ "./views/Portfolio/Web.vue")
      
    },
    {
      path: "*",
      name: "Error",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Error.vue")
    },
    // {
    //   path: '/vuetest/apt',
    //   name: 'Apt',
    //   component: Apt,
    // },
    {
      path: "/Apt",
      name: "Apt",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Apt.vue")
    },
    {
      path: "/join",
      name: "join",
      component: Join
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {

      path: "/mypage",
      name: "mypage",
      component: Mypage
    },
    {
      path: "/modify",
      name: "modify",
      component: Modify
    },
    {
      path: "/theme",
      name: "theme",
      component: Theme
    },
    {
      name: "book",
      path: "/book",
      component: Book,
      children: [
        {
          path: "",
          name: "book-list",
          component: () => import("@/components/book/BookList.vue")
        },
        {
          path: "create",
          name: "book-create",
          component: () => import("@/components/book/BookCreate.vue")
        },
        {
          path: "view",
          name: "book-view",
          component: () => import("@/components/book/BookView.vue")
        },
        {
          path: "modify/:isbn",
          name: "book-modify",
          component: () => import("@/components/book/BookModify.vue")
        }
      ],
      redirect: () => {
        return "/book";
      }
    },
  ]
});
