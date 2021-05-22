<template>
    <b-container class="bv-example-row">
        <b-row>
            <b-col cols = "4">
                <h2>테마별 매매 정보</h2>
            </b-col>
            <b-col>
                <apt-search-bar />
            </b-col>
        </b-row>
        <b-row>
            <b-col cols = "6">
                <gmap />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import AptSearchBar from '@/components/apt/AptSearchBar.vue';
import Gmap from '@/components/apt/Gmap.vue';

export default {
    name: 'Apt',
    components: {
        AptSearchBar,
        Gmap,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style scoped></style>
