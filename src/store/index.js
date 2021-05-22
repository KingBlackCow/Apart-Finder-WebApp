import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import http from "@/util/http-common";
import router from '../router';
import jwt_decode from "jwt-decode";
import { findById } from "@/api/user.js";
import Geocoder from "@pderas/vue2-geocoder";

Vue.use(Vuex);
Vue.use(Geocoder, {
    defaultCountryCode: 'KR', // e.g. 'CA'
    defaultLanguage: 'ko', // e.g. 'en'
    defaultMode: 'address', // or 'lat-lng'
    googleMapsApiKey: 'AIzaSyAAHuS3QzpixOgCb9AOfb9yE7ITxgVmigs'
});

export default new Vuex.Store({
    state: {
        apts: [],
        apt: Object,

        cityList: [],
        guList: [],
        dongList: [],

        address: Object,
        markers: [],

        isLogin: false, // 로그인 여부
        userInfo: null,
        selectedImage: String,
        books: [],
        book: {}
    },
    getters: {
        cityList(state) {
            return state.cityList;
        },
        guList(state) {
            return state.guList;
        },
        dongList(state) {
            return state.dongList;
        },
        address(state) {
            return state.address;
        },
        apts(state) {
            return state.apts;
        },
        books(state) {
            return state.books;
        },
        book(state) {
            return state.book;
        }
    },
    mutations: {
        GET_APT_LIST(state, apts) {
        // console.log(state, apts);
            console.log(apts);
            state.apts = apts;
        },
        SELECT_APT(state, apt) {
            console.log(apt);
            state.apt = apt;
        },
        SELECT_IMG(state, selectedImage) {
            console.log(selectedImage);
            state.selectedImage = selectedImage;
        },
        SET_MARKER(state, data) {
            console.log(typeof (data));
            console.log(data);

            state.apts[data.idx].position = data.position;
        },
        SET_CITY(state, data) {
            state.cityList.length = 0;
            console.log(data);
            data.forEach(element => {
                state.cityList.push({ value: element, text: element });
            });
        },
        SET_GU(state, data) {
            state.guList.length = 0;
            data.forEach(element => {
                state.guList.push({ value: element, text: element });
            });
        },
        SET_DONG(state, data) {
            state.dongList.length = 0;
            data.forEach(element => {
                state.dongList.push({ value: element, text: element });
            });
        },
        SET_ADD(state, data) {
            console.log(data);
            state.address = data;
        },
        setIsLogined(state, isLogin) {
            state.isLogin = isLogin;
        },
        setUserInfo(state, userInfo) {
            state.isLogin = true;
            state.userInfo = userInfo;
        },
        logout(state) {
            state.isLogin = false;
            state.userInfo = null;
        },
        setBooks(state, payload) {
            state.books = payload;
        },
        setBook(state, payload) {
            state.book = payload;
        }
    },
    actions: {
        getAptList({ commit, dispatch }, dongcode) {
            console.log(dongcode);
            // vue cli enviroment variables 검색
            //.env.local file 생성.
            // 반드시 VUE_APP으로 시작해야 한다.
            //const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
            const SERVICE_KEY = '9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D';

            const SERVICE_URL =
                'http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev';

            const params = {
                LAWD_CD: dongcode,
                DEAL_YMD: '202010',
                serviceKey: decodeURIComponent(SERVICE_KEY),
            };

            // npm install --save axios
            axios
                .get(SERVICE_URL, {
                    params,
                })
                .then((response) => {
                    // console.log(response.data.response.body.items.item);
                    commit('GET_APT_LIST', response.data.response.body.items.item);

                    dispatch('getMarkers', response.data.response.body.items.item);
                })
                .catch((error) => {
                    console.dir(error);
                });
        },
        getMarkers({ commit }, item) {
            item.forEach((element, idx) => {
                let addressObj = {
                    address_line_1: element.법정동 + " " + element.도로명 + " " + element.아파트,
                }

                Vue.$geocoder.send(addressObj, response => {
                    commit('SET_MARKER', {
                        idx: idx,
                        position: {
                            lat: response.results[0].geometry.location.lat, // 해당 아파트의 lat
                            lng: response.results[0].geometry.location.lng, // 해당 아파트의 lng
                        }
                    });
                });    
            });
        },
        selectApt({ commit }, apt) {
            commit('SELECT_APT', apt);
        },
        selectAptImg({ commit }, selectedImage) {
            commit('SELECT_IMG', selectedImage);
        },
        getCityList({ commit }) {
            http
                .get("/apart/city")
                .then((data) => {
                    console.log(data.data);
                    commit("SET_CITY", data.data);
                })
                .catch(() => {
                    alert("에러발생!");
                });
        },
        getGuList({ commit }, city) {
            http
                .get("/apart/" + city)
                .then((data) => {
                    console.log(data.data);
                    commit("SET_GU", data.data);
                })
                .catch(() => {
                    alert("에러발생!");
                });
        },
        getDongList({ commit }, add) {
            console.log(add.city + " " + add.gu);
            http
                .get("/apart/"+add.city+"/"+add.gu)
                .then((data) => {
                    console.log(data.data);
                    commit("SET_DONG", data.data);
                })
                .catch(() => {
                    alert("에러발생!");
                });
        },
        getAdd({ commit, dispatch }, add) {
            http
                .get("/apart/" + add[0] + "/" + add[1] + "/" + add[2])
                .then((response) => {
                    console.log(response);
                    commit("SET_ADD", response.data);

                    dispatch('getAptList', response.data.dongcode);
                })
                .catch((error) => {
                    console.dir(error);
                });
        },
        getBooks(context) {
            http
            .get("/book")
            .then(({ data }) => {
                context.commit("setBooks", data);
            })
            .catch(() => {
                alert("에러발생!");
            });
        },
        getBook(context, payload) {
            http.get("/book/"+payload).then(({ data }) => {
            context.commit("setBook", data);
            });
        },
        async GET_MEMBER_INFO({ commit }, token) {
            let decode = jwt_decode(token);

            await findById(
                decode.userid,
                (response) => {
                if (response.data.message === "success") {
                    commit("setUserInfo", response.data.userInfo);
                  // router.push("/");
                  // router.go(router.currentRoute);
                } else {
                    console.log("유저 정보 없음!!");
                }
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        LOGOUT({ commit }) {
            commit("logout");
            localStorage.removeItem("access-token");
            // axios.defaults.headers.common["auth-token"] = undefined;
        }
    },
    modules: {},
    plugins: [createPersistedState()],
});
