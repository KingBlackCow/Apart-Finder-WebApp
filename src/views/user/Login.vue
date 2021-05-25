<template>
  <div>
    <v-container row justify-center align-center wrap class="mt-4 pt-2">
      <b-row>
        <b-col cols="4"></b-col>
        <b-col cols="4">
          <b-card
            class="text-center mt-6"
            header-html="<h3>로그인</h3>"
            style="max-width: 80rem; color:black"
            align="left"
          >
            <b-form class="text-left">
              <b-alert show variant="danger" v-if="isLoginError"
                >아이디 또는 비밀번호를 확인하세요.</b-alert
              >
              <b-form-group label="아이디" label-for="userid">
                <b-form-input
                  id="userid"
                  v-model="user.userid"
                  required
                  placeholder="아이디 입력...."
                  @keyup.enter="confirm"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="비밀번호" label-for="userpwd">
                <b-form-input
                  type="password"
                  id="userpwd"
                  v-model="user.userpwd"
                  required
                  placeholder="비밀번호 입력...."
                  @keyup.enter="confirm"
                ></b-form-input>
              </b-form-group>
              <b-button
                type="button"
                variant="primary"
                class="m-1"
                @click="confirm"
                >로그인</b-button
              >
              <router-link :to="{ name: 'contact' }">
                <b-button type="button" variant="success" class="m-1"
                  >회원가입</b-button
                >
              </router-link>
            </b-form>
          </b-card>
        </b-col>
        <b-col cols="4"></b-col>
      </b-row>
      <b-row>
        <b-col cols="4"></b-col>
        <b-col cols="4">
          <div id="app">
        <KakaoLogin
          api-key="c66a122b4c43fae154eaadd873566bb4"
          image="kakao_login_btn_medium"
          :on-success=onSuccess
          :on-failure=onFailure
        
        />
  </div>
        </b-col>
        <b-col cols="4"></b-col>
      </b-row>
    </v-container> 
  </div>
</template>

<script>
import { login } from "@/api/user.js";
import Navi from "@/components/common/Navi";
import KakaoLogin from 'vue-kakao-login'
import { mapState } from "vuex";

export default {
  name: "login",
  components: {
    Navi,
    KakaoLogin
  },
  data() {
    return {
      user: {
        userid: null,
        userpwd: null
      },
      isLoginError: false,
      client_id: "916d7a1087ccb6494372f576d3911baf",
      redirect_uri: "http://localhost:8080",
    };
  },
  methods: {
    confirm() {
      localStorage.setItem("access-token", "");
      console.log(this.user.userid);
      console.log(this.user.userpwd);
      login(
        this.user,
        (response) => {
          if (response.data.message === "success") {
            let token = response.data["access-token"];
            this.$store.commit("setIsLogined", true);
            localStorage.setItem("access-token", token);

            this.$store.dispatch("GET_MEMBER_INFO", token);
            this.$router.push("/");
          } else {
            this.isLoginError = true;
          }
        },
        (error) => {
          console.error(error);
          alert("에러입니다.");
        }
      );
      
    },
    onSuccess(){
      console.log("success");
      this.$store.commit("setUserInfo", true);
      this.$router.push("/");
    },
    onFailure(){
      console.log("failure");
      this.$router.push("/");
    },
  },
  computed: {
    kakaoLoginLink() {
      
    },
    ...mapState(["userInfo","isLogin"]),
  },


};
</script>

<style scoped>
/*#app {
  width: 400px;
  padding: 24px;
  margin: 100px auto 0 auto;
  text-align: center;
  border: 1px solid #cccccc;
}*/

#app img {
  width: 200px;
}

</style>
