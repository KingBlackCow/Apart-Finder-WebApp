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

export default {
  name: 'App',
  components: {
    KakaoLogin
  },
  methods: {
    onSuccess(){
      console.log("success");
      this.$store.commit("setUserInfo", true);
      alert("로그인 되었습니다.");
      this.$router.push("/");
    },
    onFailure(){
      console.log("failure");
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState(["userInfo","isLogin"])
  },
}
</script>

<style>
</style>
