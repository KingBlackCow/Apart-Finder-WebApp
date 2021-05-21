<template>
    <GmapMap
        :center="getAdd"
        :zoom="13"
        map-type-id="roadmap"
        style="width: 800px; height: 400px"
        >
        <GmapMarker
            :key="index"
            v-for="(m, index) in getLatLng"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
        />
    </GmapMap>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            getLatLng : [
                {position : {
                    lat: 37.58936620000001,
                    lng: 126.9000000,
                }},
            ]
        }
    },
    computed: {
        ...mapGetters([
            'address',
            'apts',
        ]),
        getAdd: function(){
            if(isNaN(this.address.lat)){
                return {lat: 37.58936620000001, lng: 126.9000000};
            }
            return {lat: Number(this.address.lat), lng: Number(this.address.lng)};
        },
        /*getLatLng: function(){
            let markers = [];

            this.apts.forEach(element => {
                let addressObj = {}
                    address_line_1: element.법정동 + " " + element.도로명 + " " + element.아파트,
                }

                this.$geocoder.send(addressObj, response => { 
                    let position = {
                        lat: response.results[0].geometry.location.lat, // 해당 아파트의 lat
                        lng: response.results[0].geometry.location.lng, // 해당 아파트의 lng
                    };
                    markers.push({position});
                });    
            });

            console.log(markers);
            return markers;
        }*/
    },
}
</script>