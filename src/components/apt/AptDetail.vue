<template>
  <b-container v-if="apt.일련번호" class="bv-example-row">
    <b-row>
      <b-col
        ><h3>{{ apt.아파트 }}</h3></b-col
      >
    </b-row>
    <b-row class="mb-2 mt-1">
      <b-col><p v-if="selectedImage"><img style="width:100%" :src="selectedImage" alt=""></p></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="">일련번호 : {{ apt.일련번호 }}</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="">아파트 이름 : {{ apt.아파트 }}</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="">법정동 : {{ apt.법정동 }}</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="">층수 : {{ apt.층 }}층</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant=""
          >거래금액 : {{ (apt.거래금액.replace(',', '') * 10000) | price }}원</b-alert
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button variant="primary" class="mr-1" @click.prevent="addList"
              >찜목록추가</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
import { createInstance } from "@/api/index.js";
export default {
  name: 'AptDetail',
  data() {
    return {
      isColor: false,
      aptWish: {
        no: "",
        name:"",
        dong: "",
        floor:"",
        price:"",
      },
    }
  },
  computed: {
    ...mapState(['apt','selectedImage']),
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  methods: {
    randomItem (items) {
      return items[Math.floor(Math.random()*items.length)];
    },
    addList() {
      const instance = createInstance();
      this.aptWish.no=this.apt.일련번호;
      this.aptWish.name=this.apt.아파트;
      this.aptWish.dong=this.apt.법정동;
      this.aptWish.floor=this.apt.층;
      this.aptWish.price=this.apt.거래금액;
      
      instance.post("/wish/add", JSON.stringify(this.aptWish))
      .then(
        (response) => {
          if (response.data.message === "success") {
            alert("찜목록 추가 완료");
            this.$router.push("/");
          } else {
            alert("찜목록 추가 실패");
          }
        }
      )
      .catch();
      this.$router.push('/addList');
    },
  },
  created() {
    this.selectedImage = this.randomItem(this.images)
  }

  
};
</script>

<style></style>
