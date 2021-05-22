<template>
  <v-layout column justify-center align-center class="mt-4 pt-2">
    <VueCompareImage
      class="hidden-md-and-down"
      hover
      :style="{ minWidth: '1300px' }"
      :sliderLineWidth="sliderLine"
      :handleSize="hSize"
      :leftImage="leftImage"
      :rightImage="rightImage"
      :sliderPositionPercentage="sliderPosition"
    />
    <VueCompareImage
      class="hidden-lg-and-up"
      hover
      :style="{ maxWidth: '400px' }"
      :sliderLineWidth="sliderLine"
      :handleSize="hSize"
      :leftImage="leftImage2"
      :rightImage="rightImage2"
      :sliderPositionPercentage="sliderPosition"
    />

    <br>

    <vue-typer class="headline" :repeat="0" text="Apart Selling Finder"></vue-typer>
    <vue-typer
      :text="text1"
      :repeat="Infinity"
      :shuffle="false"
      initial-action="erasing"
      :pre-type-delay="70"
      :type-delay="70"
      :pre-erase-delay="1980"
      :erase-delay="150"
      erase-style="select-back"
      :erase-on-complete="false"
      caret-animation="smooth"
    ></vue-typer>
    <br>
    <v-flex xs12 sm6 md4 lg4 xl4>
      <v-card flat color="transparent" max-width="500">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
              <span>What about this </span>
              <span class="green--text">service?</span>
            </h3>
            <div>
              <p>
                보다 완벽한  집 선택을 위한 서비스!
              </p>
            
              <!-- <span class="green--text font-weight-bold">VUE</span> -->
            </div>
          </div>
        </v-card-title>

        <v-card-actions class="hidden-sm-and-down">
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            fab
            dark
            outline
            color="green"
            :href="icon.href"
            target="_blank"
          >
            <v-icon dark>{{icon.icon}}</v-icon>
          </v-btn>
        </v-card-actions>

        <!-- <v-card-actions class="hidden-md-and-up justify-center">
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            small
            fab
            dark
            outline
            color="green"
            :href="icon.href"
            target="_blank"
          >
            <v-icon dark>{{icon.icon}}</v-icon>
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-flex>

    <v-layout row justify-center align-center wrap class="mt-6 pt-2">
      <v-flex v-for="portfolio in portfolios" :key="portfolio.src" xs12 sm12 md4 lg4 xl4>
        <v-card
          :to="'/portfolio/'+(portfolio.title).toLowerCase()"
          hover
          flat
          color="transparent"
          height="230"
          :href="portfolio.href"
        >
          <v-card-title></v-card-title>
          <v-img :src="portfolio.src" aspect-ratio="2.75" width="150" height="150" contain></v-img>
          <v-card-title primary-title class="justify-center">
            <v-flex text-xs-center subheading font-weight-bold>{{portfolio.title}}</v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    
  </v-layout>
    
</template>

<script>
import { VueTyper } from "vue-typer";
import VueCompareImage from "vue-compare-image";

export default {
  metaInfo: {
    title: "Home",
    titleTemplate: "%s ← Eldin's Space",
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: "Eldin Zaimovic's Portfolio" },
      { charset: "utf-8" },
      { property: "og:title", content: "Eldin' Space" },
      { property: "og:site_name", content: "Eldin' Space" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://eldin.space" },
      {
        property: "og:image",
        content: "https://i.imgur.com/Dcz2PGx.jpg"
      },
      { property: "og:description", content: "Eldin Zaimovic's Portfolio" }
    ]
  },
  components: {
    "vue-typer": VueTyper,
    VueCompareImage
  },
  data() {
    return {
      icons: [
        { href: "https://github.com/EldinZaimovic", icon: "fab fa-github" },
        {
          href: "https://stackoverflow.com/users/story/9660700",
          icon: "fab fa-stack-overflow"
        },
        { href: "https://twitter.com/EldinMatricar", icon: "fab fa-twitter" },
        {
          href: "https://www.linkedin.com/in/eldin-zaimovic",
          icon: "fab fa-linkedin-in"
        },
        {
          href: "https://www.xing.com/profile/Eldin_Zaimovic?sc_o=mxb_p",
          icon: "fab fa-xing"
        },
        {
          href: "https://www.facebook.com/EldinVasVoli",
          icon: "fab fa-facebook-f"
        },
        { href: "https://www.instagram.com/matricar", icon: "fab fa-instagram" }
      ],
      text1: ["당신의 집을 기대합니다.", "누구보다 완벽한 집", "가장 내게 맞는 집"],
    
      leftImage: "https://i.postimg.cc/650Y5zzM/apt4.jpg",
      rightImage: "https://i.postimg.cc/j50zhJZW/apt6.jpg",
      leftImage2: "https://i.postimg.cc/650Y5zzM/apt4.jpg",
      rightImage2: "https://i.postimg.cc/j50zhJZW/apt6.jpg",
      sliderLine: 0,
      hSize: 0,
      sliderPosition: 0.5,
      portfolios: [
        {
          src: "https://i.imgur.com/GvTt5GG.png",
          title: "Web"
        },

        {
          src: "https://i.imgur.com/wXLtLKy.png",
          title: "Video"
        },
        {
          src: "https://i.imgur.com/g74mGuU.png",
          title: "Graphic"
        }
      ]
    
    };
  }
};
</script>
<style>
@keyframes rocking {
  0%,
  100% {
    transform: rotateZ(-10deg);
  }

  50% {
    transform: rotateZ(10deg);
  }
}

.vue-typer {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
.vue-typer .custom.char.typed {
  color: green;
}
.vue-typer .custom.char.selected {
  color: #e91e63;
}

.vue-typer .custom.caret {
  animation: rocking 1s ease-in-out 0s infinite;
}
.vue-typer .custom.caret.typing {
  background-color: green;
}
.vue-typer .custom.caret.selecting {
  display: inline-block;
  background-color: #e91e63;
}
</style>

