<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary app width="150" height="340">
      <v-list class="pt-4">
        <v-list-tile active-class="green--text" to="/">
          <v-list-tile-content>
            <v-list-tile-title>HOME</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile active-class="green--text" to="/resume">
          <v-list-tile-content>
            <v-list-tile-title>RESUME</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile active-class="green--text" to="/services">
          <v-list-tile-content>
            <v-list-tile-title>SERVICES</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile active-class="green--text" to="/portfolio">
          <v-list-tile-content>
            <v-list-tile-title>PORTFOLIO</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile active-class="green--text" to="/blog">
          <v-list-tile-content>
            <v-list-tile-title>BLOG</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile active-class="green--text" to="/wishlist">
          <v-list-tile-content>
            <v-list-tile-title>WISHLIST</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile active-class="green--text" to="/contact">
          <v-list-tile-content>
            <v-list-tile-title>CONTACT</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile active-class="green--text" to="/login">
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar flat dense color="transparent" scroll-off-screen>
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline">
        <span class="font-weight-light">Apart </span>
        <span class="green--text">Finder</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="changeTheme" depressed small icon class="hidden-md-and-up">
        <v-icon v-if="goDark==true">fas fa-sun</v-icon>
        <v-icon v-else>fas fa-moon</v-icon>
      </v-btn>
      <v-toolbar-items class="hidden-sm-and-down" v-if="userInfo === null">
        <v-btn flat to="/" active-class="green--text headline">Home</v-btn>
        <v-btn flat to="/contact" active-class="green--text headline">Contact</v-btn>
        <v-btn flat to="/login" active-class="green--text headline">Login</v-btn>
        <v-btn @click="changeTheme" depressed small icon>
          <v-icon v-if="goDark==true">fas fa-sun</v-icon>
          <v-icon v-else>fas fa-moon</v-icon>
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-sm-and-down" v-else>
        <v-btn flat to="/" active-class="green--text headline">Home</v-btn>
        <v-btn flat to="/Apt" active-class="green--text headline">Apt</v-btn>
        <v-btn flat to="/Sales" active-class="green--text headline">Sales</v-btn>
        <v-btn @click="popularUpdate" flat to="/popular" active-class="green--text headline">Popular</v-btn>
        <v-btn flat to="/thema" active-class="green--text headline">Circumstance</v-btn>
        <v-btn @click="wishUpdate" flat to="/wishlist" active-class="green--text headline">WishList</v-btn>
        <v-btn flat to="/book" active-class="green--text headline">Board</v-btn>
        <v-btn flat to="/mypage" active-class="green--text headline">Mypage</v-btn>
        <v-btn flat to="/" active-class="" @click.prevent="onClickLogout">Logout</v-btn>
        <v-btn @click="changeTheme" depressed small icon>
          <v-icon v-if="goDark==true">fas fa-sun</v-icon>
          <v-icon v-else>fas fa-moon</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    goDark: {
      type: Boolean
    }
  },
  data() {
    return {
      drawer: null
    };
  },
  computed: {
    ...mapState(["userInfo", "isLogin"])
  },
  methods: {
    ...mapActions([
      'getCityListRand',
      'getWishLists'
    ]),
    changeTheme() {
      this.$emit("changeTheme", this.goDark);
    },
    onClickLogout() {
      alert("로그아웃 하시겠습니까?");
      this.$store
        .dispatch("LOGOUT")
        .then(() => {
          // this.$router.push({ name: "" });
          if (this.$route.path !== "/") this.$router.replace("/");
          
        })
        .catch(() => {
          console.log("로그아웃 문제!!!");
        });
    },
    popularUpdate(){
      this.getCityListRand();
    },
    wishUpdate(){
      this.getWishLists();
    }
  }
};
</script>

<style >
</style>