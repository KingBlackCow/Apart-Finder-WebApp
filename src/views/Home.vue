<template>
  <v-layout column justify-center align-center class="mt-4 pt-2">

    <h1 class="multiEffect">Apart Finder</h1>
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
    <br>
    
    <div> 
      <div class="today">
          <h1><Roller text="whole sale"
          :charList="['a', 'b', 'c', 'd','e','f','g','h','i','w','o','l','s']"
          transition="0.5"/></h1>
          <div> 
            <number class="number" :from="0" :to="68864" :duration="2"/>
        
          </div> 
        </div> 
    </div>

    
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
    <br>
    <v-flex xs12 sm6 md4 lg4 xl4>
      <v-card flat color="transparent" max-width="500">
        <v-card-title primary-title>
          <div>
            <h1 class="headline mb-0">
              <span>What about this </span>
              <span class="green--text">service?</span>
            </h1>
            <div>
              <p>
                보다 완벽한  집 선택을 위한 서비스!
              </p>
            
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

      </v-card>
    </v-flex>
  
    <v-layout row justify-center align-center wrap class="mt-6 pt-2">
      <v-flex v-for="portfolio in portfolios" :key="portfolio.src" md2>
        <v-card
          :to="'/'+(portfolio.title).toLowerCase()"
          hover
          flat
          color="transparent"
          height="230"
          :href="portfolio.href"
        >
          <v-card-title></v-card-title>
          <v-img :src="portfolio.src" aspect-ratio="2.75" width="150" height="150" contain></v-img>
          
          <v-card-title primary-title class="justify-center" style="20px">
            <v-flex text-xs-center subheading font-weight-bold>{{portfolio.title}}</v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    
  </v-layout>
    

</template>

<script>
import Vue from 'vue'
import { VueTyper } from "vue-typer";
import VueCompareImage from "vue-compare-image";
import VueNumber from 'vue-number-animation'
import Roller from "vue-roller";

Vue.use(VueNumber)



export default {
  metaInfo: {
    title: "Home",
    titleTemplate: "ApartFinder",
    meta: [
      
      { charset: "utf-8" },
      
    ]
  },
  components: {
    "vue-typer": VueTyper,
    VueCompareImage,
    Roller
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
          title: "Popular"
        },

        {
          src: "https://i.postimg.cc/kM0Nx1wM/infra2.png",
          title: "Thema"
        },
        {
          src: "https://i.postimg.cc/KYMpGSsL/wishlist.png",
          title: "WishList"
        },
        {
          src: "https://i.postimg.cc/CLrcbL3k/apt.png",
          title: "Apt"
        },
        {
          src: "https://i.postimg.cc/fyLxbYTF/board.png",
          title: "Board"
        },
        {
          src: "https://i.postimg.cc/bdfN5jMT/mypage.png",
          title: "MyPage"
        },
      
      ],
      someList:[
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
      ],
        //Sliding configuration [obj]
      options: {
        currentPage: 0,
        thresholdDistance:500,
        thresholdTime:100,
        autoplay:3000,
        loop:true,
        direction:'vertical',
        loopedSlides:1,
        slidesToScroll:1,
        timingFunction: 'ease',
        speed: 300
      },
      
    } 
  }
}

</script>
<style scoped>
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
  font-family: Verdana, Geneva, Arial, sans-serif;
}
.vue-typer .custom.char.typed {
  color: white;
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
.vue-displacement {
  width: 200px;
  height: 100%;
}

.today { margin: 50px auto; text-align: center; } 
.today p { font-size: 70px; line-height: 1; } 
/* div { margin: 50px 0 0 0; padding: 30px; font-size: 40px; font-weight: bold; color: #707070; } */
.number { 
  letter-spacing: 2px; 
  padding: 5px;
  border-radius: 20px; 
  font-size: 40px;
}
.textA { margin: 50px 0 0 0; padding: 30px; font-size: 40px; font-weight: bold; color:greenyellow; }
.multiEffect {  
  color : white;
  text-shadow : 2px 2px 2px white, 
          0 0 50px blue,
          0 0 5px black;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style:italic;
}

@keyframes textColorAnimation {
    0% {  color : white;}
    50% {  color : black;}
    100% { color : white;}
}
h1 {
  font-family : "Georgia";
  animation-name: textColorAnimation;
  animation-duration: 10s;
  animation-iteration-count: infinite;
}

#chart { padding: 50px; } 
#chart p { 
  font-size: 30px; font-weight: bold; color: #737373; margin: 0 0 50px 0; }


</style>

