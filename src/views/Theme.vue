<template>
    <b-container class="bv-example-row">
        <b-row>
            <b-col cols = "4">
                <h2>시군구별 테마 정보</h2>
            </b-col>
        </b-row>
        <b-row>
            <apt-search-bar />
        </b-row>
        <b-row>
            <b-col cols = "6">
                <medical-chart />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import AptSearchBar from '@/components/apt/AptSearchBar.vue';
import MedicalChart from '@/components/theme/medical.vue';

export default {
    name: 'Theme',
    components: {
        AptSearchBar,
        MedicalChart,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style scoped></style>
