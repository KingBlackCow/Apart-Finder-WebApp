import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import http from "@/util/http-common";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apts: [],
        apt: Object,
        cityList: [],
        guList: [],
        dongList: [],
        address: Object,
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
        }
    },
    mutations: {
        GET_APT_LIST(state, apts) {
        // console.log(state, apts);
            state.apts = apts;
        },
        SELECT_APT(state, apt) {
            state.apt = apt;
        },
        SET_CITY(state, data) {
            state.cityList.length = 0;
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
            state.address = data.data;
        }
    },
    actions: {
        getAptList({ commit, state}) {
            console.log(state.address.dongcode);
            // vue cli enviroment variables 검색
            //.env.local file 생성.
            // 반드시 VUE_APP으로 시작해야 한다.
            //const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
            const SERVICE_KEY = '9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D';

            const SERVICE_URL =
                'http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev';

            const params = {
                LAWD_CD: state.address.dongcode,
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
                })
                .catch((error) => {
                console.dir(error);
                });
        },
        selectApt({ commit }, apt) {
            commit('SELECT_APT', apt);
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
            console.log(this);
            http
                .get("/apart/"+add[0]+"/"+add[1]+"/"+add[2])
                .then((data) => {
                    console.log(data);
                    commit("SET_ADD", data);

                    dispatch('getAptList');
                })
                .catch(() => {
                    alert("에러발생!");
                });
        }
    },
    modules: {},
    plugins: [createPersistedState()],
});
