import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import http from "@/util/http-common";
import router from '../router';
import jwt_decode from "jwt-decode";
import { findById } from "@/api/user.js";
import Geocoder from "@pderas/vue2-geocoder";
import { json } from 'd3-fetch';

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

        theme: {
            "이름": 'theme',
            "children": [],
        },

        comm: {
            "name": 'comm',
            "children": [],
        },

        address: Object,
        markers: [],
        isLogin: false, // 로그인 여부
        userInfo: null,
        selectedImage: String,
        books: [],
        book: {},
        wishapts:[],
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
        markers(state) {
            return state.markers;
        },
        books(state) {
            return state.books;
        },
        book(state) {
            return state.book;
        },
        wishapts(state) {
            return state.wishapts;
        },
        themeData(state) {
            return state.theme;
        },
        commData(state) {
            return state.comm;
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
            console.log(data);

            // state.apts[data.idx].position = data.position;
            let pos = {};
            pos.position = { lat: data.lat, lng: data.lng };
            state.markers.push(pos);
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
        setWishLists(state, payload) {
            state.wishapts = payload;
        },
        setWishListsChange(state, payload) {
            state.wishapts.length = 0;
            state.wishapts = payload;
        },
        setDongListsChange(state, payload) {
            state.wishapts.length = 0;
            state.wishapts = payload;
        },
        setFloorListsChange(state, payload) {
            state.wishapts.length = 0;
            state.wishapts = payload;
        },
        setPriceListsChange(state, payload) {
            state.wishapts.length = 0;
            state.wishapts = payload;
        },
        setBook(state, payload) {
            state.book = payload;
        },
        SET_HOS(state, payload) {
            let hos = new Object;
            hos.이름 = '국민안심병원';
            hos.children = payload;

            state.theme.children.push(hos);
        },
        SET_CLINIC(state, payload) {
            let clinic = new Object;
            clinic.이름 = '선별진료소';
            clinic.children = payload;

            state.theme.children.push(clinic);
        },
        SET_RES(state, payload) {
            let res = new Object;
            res.이름 = '호흡기전담클리닉';
            res.children = payload;

            state.theme.children.push(res);
        },
        SET_COMM_L(state, payload) {
            state.comm.children = payload;
            state.comm.children.forEach(element => {
                element.name = element.indsLclsNm;
            });
        },
        SET_COMM_M(state, payload) {
            payload.element.children = payload.res;
            payload.element.children.forEach(element => {
                element.name = element.indsMclsNm;
            });
        },
        SET_COMM_S(state, payload) {
            payload.element.children = payload.res;
            payload.element.children.forEach(element => {
                element.name = element.indsSclsNm;
                element.value = element.statCnt;
            });
        },
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
        getMarkers({ commit, state }, item) {
            state.markers = [];

            item.forEach((element, idx) => {
                let addressObj = {
                    address_line_1: element.법정동 + " " + element.도로명 + " " + element.아파트,
                }

                Vue.$geocoder.send(addressObj, response => {
                    commit('SET_MARKER', response.results[0].geometry.location);
                });    
            });
        },
        selectApt({ commit }, apt) {
            commit('SELECT_APT', apt);
        },
        selectAptImg({ commit }, selectedImage) {
            commit('SELECT_IMG', selectedImage);
        },
        getCityListRand({ commit }) {
            http
                .get("/apart/cityrand")
                .then((data) => {
                    console.log(data.data);
                    commit("SET_CITY", data.data);
                })
                .catch(() => {
                    alert("에러발생!");
                });
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
        getWishLists(context) {
            http
            .get("/wish")
                .then(({ data }) => {
                console.log(data);
                context.commit("setWishLists", data);
            })
            .catch(() => {
                alert("에러발생!");
            });
        },
        getNameSortList(context, payload) {
            console.log(payload);
            http
                .get("/wish/name" ,{
                    params: {
                        namestate: payload.nameflag
                    }
                })
                .then(({ data }) => {
                    
                    console.log(data);
                    
                    context.commit("setWishListsChange", data);
                })
                .catch(() => {
                    alert("namesort에러");
                });
        },
        getDongSortList(context, payload) {
            console.log(payload);
            console.log("dongsort");
            http
                .get("/wish/dong" ,{
                    params: {
                        dongstate: payload.dongflag
                    }
                })
                .then(({ data }) => {
                    
                    console.log(data);
                    
                    context.commit("setDongListsChange", data);
                })
                .catch(() => {
                    alert("dongsort에러");
                });
        },
        getFloorSortList(context, payload) {
            console.log(payload);
            console.log("floorsort");
            http
                .get("/wish/floor" ,{
                    params: {
                        floorstate: payload.floorflag
                    }
                })
                .then(({ data }) => {
                    
                    console.log(data);
                    
                    context.commit("setFloorListsChange", data);
                })
                .catch(() => {
                    alert("dongsort에러");
                });
        },
        getPriceSortList(context, payload) {
            console.log(payload);
            console.log("pricesort");
            http
                .get("/wish/price" ,{
                    params: {
                        pricestate: payload.priceflag
                    }
                })
                .then(({ data }) => {
                    
                    console.log(data);
                    
                    context.commit("setPriceListsChange", data);
                })
                .catch(() => {
                    alert("pricesort에러");
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
        },
        setTheme({ commit, state }, gu) {
            state.theme.children = [];

            http
                .get("/theme/hos", {
                    params: {
                        si: '서울',
                        gu: gu,
                    }
                })
                .then(({ data }) => {
                    commit('SET_HOS',data);
                });
            http
                .get("/theme/clinic", {
                    params: {
                        si: '서울',
                        gu: gu,
                    }
                })
                .then(({ data }) => {
                    commit('SET_CLINIC',data);
                });
            http
                .get("/theme/res", {
                    params: {
                        si: '서울',
                        gu: gu,
                    }
                })
                .then(({ data }) => {
                    commit('SET_RES',data);
                });
        },
        setComm({ commit, state, dispatch }) {
            state.comm.children = [];

            const SERVICE_KEY = 'kox33uURucSpZ6qsW8bzyifC%2ByXykFsPCbqAMn7Dg2r5o8XO2QS9%2F3QpRRu4Vm39fNlH4B3FbcS7Z1wawBjHtg%3D%3D';

            const SERVICE_URL =
                'http://apis.data.go.kr/B553077/api/open/sdsc/storeStatsUpjongInAdmi';

            const params = {
                key: state.address.dongcode,
                divId: 'signguCd',
                serviceKey: decodeURIComponent(SERVICE_KEY),
                type: 'json',
            };

            // npm install --save axios
            axios
                .get(SERVICE_URL, {
                    params,
                })
                .then((response) => {
                    commit('SET_COMM_L', response.data.body.items);
                    dispatch('setCommM', response.data.body.items);
                })
                .catch((error) => {
                    console.dir(error);
                });
        },
        setCommM({ commit, state, dispatch }, data) {
            const SERVICE_KEY = 'kox33uURucSpZ6qsW8bzyifC%2ByXykFsPCbqAMn7Dg2r5o8XO2QS9%2F3QpRRu4Vm39fNlH4B3FbcS7Z1wawBjHtg%3D%3D';

            const SERVICE_URL =
                'http://apis.data.go.kr/B553077/api/open/sdsc/storeStatsUpjongInAdmi';
            
            data.forEach(element => {
                const params = {
                    key: state.address.dongcode,
                    divId: 'signguCd',
                    serviceKey: decodeURIComponent(SERVICE_KEY),
                    type: 'json',
                };
                params.indsLclsCd = element.indsLclsCd;

                axios
                    .get(SERVICE_URL, {
                        params,
                    })
                    .then((response) => {
                        let res = response.data.body.items;
                        commit('SET_COMM_M', { element, res});

                        dispatch('setCommS', { element, res});
                    })
                    .catch((error) => {
                        console.dir(error);
                    });
            });
        },
        setCommS({ commit, state, dispatch }, data) {
            const SERVICE_KEY = 'kox33uURucSpZ6qsW8bzyifC%2ByXykFsPCbqAMn7Dg2r5o8XO2QS9%2F3QpRRu4Vm39fNlH4B3FbcS7Z1wawBjHtg%3D%3D';

            const SERVICE_URL =
                'http://apis.data.go.kr/B553077/api/open/sdsc/storeStatsUpjongInAdmi';
            
            data.res.forEach(element => {
                const params = {
                    key: state.address.dongcode,
                    divId: 'signguCd',
                    serviceKey: decodeURIComponent(SERVICE_KEY),
                    type: 'json',
                };
                params.indsMclsCd = element.indsMclsCd;

                axios
                    .get(SERVICE_URL, {
                        params,
                    })
                    .then((response) => {
                        let res = response.data.body.items;
                        commit('SET_COMM_S', { element, res});
                    })
                    .catch((error) => {
                        console.dir(error);
                    });
            });
        },
    },
    modules: {},
    plugins: [createPersistedState()],
});
