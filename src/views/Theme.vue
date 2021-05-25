<template>
    <b-container class="bv-example-row doctor" >
        <b-row>
            <b-col cols = "4">
                <h2>시군구별 테마 정보</h2>
            </b-col>
        </b-row>
        <b-row class="justify-center">
            <b-form-group
                v-slot="{ ariaDescribedby }"
                >
                <b-form-radio-group
                    id="btn-radios-2"
                    style="margin-left: 44%;"
                    v-model="selected"
                    :options="options"
                    :aria-describedby="ariaDescribedby"
                    button-variant="outline-primary"
                    size="lg"
                    name="radio-btn-outline"
                    buttons
                ></b-form-radio-group>
            </b-form-group>
        </b-row>
        <b-row style="margin-left: 37%;">
            <apt-search-bar />
        </b-row>
        <b-row class="justify-center">
            <b-col cols = "6" v-if="selected=='medic'">
                <medical-chart />
            </b-col>
            <b-col cols = "6" v-else-if="selected=='comm'">
                <comm-chart />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import AptSearchBar from '@/components/apt/AptSearchBar.vue';
import MedicalChart from '@/components/theme/medical.vue';
import CommChart from '@/components/theme/commercial.vue';

export default {
    name: 'Theme',
    components: {
        AptSearchBar,
        MedicalChart,
        CommChart,
    },
    data() {
        return {
            selected: 'medic',
            options: [
            { text: '의료', value: 'medic' },
            { text: '상권', value: 'comm' },
            ]
        };
    },
    methods: {},
};
</script>

<style scoped>
    .medic{
        background-image: url("/data/doctor.jpg");
        width: 300px;
        height: 200px;
    }
    .mid{
        margin: 0 auto;
    }
    
</style>
