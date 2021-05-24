<template>
  <div id="app">
    <KakaoLogin
      api-key="c66a122b4c43fae154eaadd873566bb4"
      image="kakao_login_btn_large"
      :on-success=onSuccess
      :on-failure=onFailure
    
    />
  </div>
</template>

<script>
import KakaoLogin from 'vue-kakao-login'
import { mapState } from "vuex";
// let onSuccess = (data) => {
//   console.log(data)
//   console.log("success")
//   move();
// }
// let onFailure = (data) => {
//   console.log(data)
//   console.log("failure")
    
// }
function move(){
  location.replace('http://localhost:8080');
  
}

export default {
  name: 'App',
  components: {
    KakaoLogin
  },
  methods: {
    onSuccess(){
      console.log("success");
      this.$store.commit("setUserInfo", true);
      this.$router.push("/");
    },
    onFailure(){
      console.log("failure");
      this.$router.push("/");
    },
    movePage(){
      this.$router.push("/");
    },
    confirm() {
      console.log("hihi");
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
  },
  computed: {
    ...mapState(["userInfo","isLogin"])
  },
}
</script>

<style>
</style>
