<template>
    <GmapMap
        :center="{lat: Number(address.lat), lng: Number(address.lng)}"
        :zoom="14"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
        >
        <!-- <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
        /> -->
    </GmapMap>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'address',
        ]),
    },
}
</script>