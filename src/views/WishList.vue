<template>
  <div style="padding:30px">
    <h1 class="green--text">WishList</h1>
    
    <div v-if="wishapts.length">
      <table id="book-list">
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 30%" />
          <col style="width: 20%" />
          <col style="width: 20%" />
          <col style="width: 20%" />
        </colgroup>
        <thead>
          <tr>
            <th>번지수</th>
            <th>아파트이름</th>
            <th>법정동</th>
            <th>층수</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          <list-row-wish
            v-for="(apt, index) in wishapts"
            :key="index"
            :no="apt.no"
            :name="apt.name"
            :dong="apt.dong"
            :floor="apt.floor"
            :price= "apt.price"
          />
          </tbody>
      </table>
    </div>
    <div v-else class="text-center">게시글이 없습니다.</div>
    <div id="chart" >
      <p class="green--text">Price Compare Chart</p>
      <apexchart width="1000" height="600" type="bar" color=green :options="options2" :series="series"/>
    </div>
  </div>

  
</template>

<script>
import { mapGetters } from "vuex";
import ListRowWish from "@/components/book/include/ListRowWish.vue";

export default {
  name: "wishlist",
  components: {
    ListRowWish
  },
  computed: {
    ...mapGetters(["wishapts"])
  },
  created() {
    this.$store.dispatch("getWishLists");
    this.wishapts.forEach(wishapt => {
      this.options2.xaxis.categories.push(wishapt.name);
      this.series[0].data.push(parseInt(wishapt.price));
    });
  },
  methods: {
    
  },
  data(){
    return{
      options2: { 
        xaxis: { 
          categories: [], 
        }, 
        colors: ['#FEDD36'], 
        fill: { 
          type: 'gradient',
          gradient: { 
            shadeIntensity: 1, 
            type: "vertical", 
            opacityFrom: 0.7, 
            opacityTo: 0.9, 
            colorStops: [ {
              offset: 0, 
              color: "#fbc2eb", 
              opacity: 1
            }, 
            {
              offset: 100,
              color: "#a18cd1", 
              opacity: 1
            }
            ]
          } 
        }, 
        plotOptions: {
          bar: {
            columnWidth: '30%', 
            endingShape: 'rounded', 
            dataLabels: {position: 'top'}
          } 
        }, 
      }, 
      series: [
        {
          name: 'data', 
          data: []
        }
      ], 
    }
  }
};
</script>

<style scoped>
#book-list {
  border-collapse: collapse;
  width: 100%;
}

#book-list thead {
  font-weight: bold;
}

#book-list td,
#book-list th {
  text-align: center;
  border-bottom: 1px solid #ddd;
  height: 50px;
}
#chart { padding: 50px; align-content: center;} 
#chart p { 
  font-size: 30px; font-weight: bold; color: green; margin: 0 0 50px 0; 
}

</style>
