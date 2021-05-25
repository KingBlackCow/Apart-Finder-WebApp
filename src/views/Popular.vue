<template>
  <v-container grid-list-xl>
    <h2 class="pl-4">
      <span>현재 </span>
      <span class="green--text">인기순위</span>
    </h2>
    <v-layout row justify-center align-center wrap class="mt-4 pt-2">
      <v-dialog
        v-model="project.dialog"
        lazy
        max-width="1000"
        v-for="(project,index) in projects"
        :key="index"
      >
        <template v-slot:activator="{ on }">
          <v-flex class="mt-6 pt-2" md6 v-on="on">
            <v-card hover flat color="transparent">
              <h1>현재 {{index+1}}위</h1>
              <v-img
                :src="project.poster"
                :alt="project.title"
                height="230"
              ></v-img>
              <v-card-title primary-title class="justify-center">{{project.title}}</v-card-title>
            </v-card>
          </v-flex>
        </template>
        <v-card v-if="project.dialog">
          <v-img :src="project.poster"></v-img>
          <v-card-text>
            <h3 class="headline mb-0">
              <span>{{project.title}}</span>
            </h3>
            <v-chip color="green" text-color="white">번지수: {{project.tech.tech1}}</v-chip>
            <v-chip color="green" text-color="white">법호동: {{project.tech.tech2}}</v-chip>
            <v-chip color="green" text-color="white">층수: {{project.tech.tech3}}</v-chip>
            <v-chip color="green" text-color="white">가격: {{project.tech.tech4}}</v-chip>
          </v-card-text>
          <v-card-actions>
            <b-button variant="primary" class="mr-1" @click.prevent="addList(index)"
              >찜목록추가</b-button>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex';
import { createInstance } from "@/api/index.js";
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

export default {
  metaInfo: {
    title: "",
    titleTemplate: "ApartFinder",
  },
  data() {
    return {
      dialog: false,
      projects: [
        {
          dialog: false,
          title: "Euphoric Voyage",
          tech: {
            tech1: "",
            tech2: "",
            tech3: "",
            tech4: ""
          },
          poster: "https://i.postimg.cc/sXXDxnsz/apt1.jpg"
        },
        {
          dialog: false,
          title: "This Site",
          tech: {
            tech1: "",
            tech2: "",
            tech3: "",
            tech4: ""
          },
          poster: "https://i.postimg.cc/26VbMjqn/apt2.jpg"
        },
        {
          dialog: false,
          title: "Frontend Developer at Brandly.com",
          tech: {
            tech1: "",
            tech2: "",
            tech3: "",
            tech4: ""
          },
          poster: "https://i.postimg.cc/Px9pjGZ9/apt3.jpg"
        },
        {
          dialog: false,
          title: "Digital Madness Test",
          tech: {
            tech1: "",
            tech2: "",
            tech3: "",
            tech4: ""
          },
          poster: "https://i.postimg.cc/9094XxYM/apt4.jpg"
        },
        {
          dialog: false,
          title: "IBM Coding Challenge - Films Location",
          tech: {
            tech1: "",
            tech2: "",
            tech3: "",
            tech4: ""
          },
          poster: "https://i.postimg.cc/44HH1dRg/apt5.jpg"
        },
      ],
      aptWish: {
        no: "",
        name:"",
        dong: "",
        floor:"",
        price:"",
      },
    };
  },
  mounted() {
    //this.getCityListRand();
    console.log(this.cityList);
    this.projects[0].title = this.cityList[0].text.aptNAme;
    this.projects[0].tech.tech1 = this.cityList[0].text.code;
    this.projects[0].tech.tech2 = this.cityList[0].text.dong;
    this.projects[0].tech.tech3 = this.cityList[0].text.floor;
    this.projects[0].tech.tech4 = this.cityList[0].text.dealAmount;

    this.projects[1].title = this.cityList[1].text.aptNAme;
    this.projects[1].tech.tech1 = this.cityList[1].text.code;
    this.projects[1].tech.tech2 = this.cityList[1].text.dong;
    this.projects[1].tech.tech3 = this.cityList[1].text.floor;
    this.projects[1].tech.tech4 = this.cityList[1].text.dealAmount;

    this.projects[2].title = this.cityList[2].text.aptNAme;
    this.projects[2].tech.tech1 = this.cityList[2].text.code;
    this.projects[2].tech.tech2 = this.cityList[2].text.dong;
    this.projects[2].tech.tech3 = this.cityList[2].text.floor;
    this.projects[2].tech.tech4 = this.cityList[2].text.dealAmount;

    this.projects[3].title = this.cityList[3].text.aptNAme;
    this.projects[3].tech.tech1 = this.cityList[3].text.code;
    this.projects[3].tech.tech2 = this.cityList[3].text.dong;
    this.projects[3].tech.tech3 = this.cityList[3].text.floor;
    this.projects[3].tech.tech4 = this.cityList[3].text.dealAmount;

    this.projects[4].title = this.cityList[4].text.aptNAme;
    this.projects[4].tech.tech1 = this.cityList[4].text.code;
    this.projects[4].tech.tech2 = this.cityList[4].text.dong;
    this.projects[4].tech.tech3 = this.cityList[4].text.floor;
    this.projects[4].tech.tech4 = this.cityList[4].text.dealAmount;

  },
  computed: {
    ...mapGetters(["cityList"])
  },
  methods: {
    ...mapActions([
      'getCityListRand',
    ]),
    addList(i) {
      const instance = createInstance();
      this.aptWish.no=this.projects[i].tech.tech1;
      this.aptWish.name=this.projects[i].title;
      this.aptWish.dong=this.projects[i].tech.tech2;
      this.aptWish.floor=this.projects[i].tech.tech3;
      this.aptWish.price=this.projects[i].tech.tech4;
      
      instance.post("/wish/add", JSON.stringify(this.aptWish))
      .then(
        (response) => {
          if (response.data.message === "success") {
            alert("찜목록 추가 완료");
            
          } else {
            alert("찜목록 추가 실패");
          }
        }
      )
      .catch();
    },
  },
  
};
</script>

<style  scoped>
</style>