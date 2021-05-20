<template>
    <v-container grid-list-xl>
        <v-layout row justify-center align-center wrap class="mt-4 pt-2">
        
        <v-flex xs12 sm12 md6 lg6 xl6>
            <h2 class="pb-4 mb-4">
            <span>Login</span>
            <span class="green--text">Form</span>
            </h2>

            <form>
            <v-text-field
                userid="id"
                color="green"
                background-color="transparent"
                v-model="id"
    
                label="Id"
                required
            ></v-text-field>
            <v-text-field
                userpwd="password"
                color="green"
                background-color="transparent"
                v-model="password"
                
                label="password"
                required
            ></v-text-field>
            
            <v-btn
                @click="submit"
                type="submit"
                color="green"
                class="white--text"
                
            >SEND MESSAGE</v-btn>
            <v-btn @click="clear">clear</v-btn>
            </form>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import http from '@/util/http-common';
export default {
    data() {
        return {
        id:"",
        password: "",
        
        };
    },
    methods: {
        submit() {
            alert(`${this.$store.state.host}/user/login`);    
            http.post(`/user/login`, { userid: this.id, userpwd: this.password}).then(
                res=> {
                    console.log(res);
                    this.$store.commit('loginToken',res.data.token);
                    this.$router.push("/");
                }
            )
        },

    clear() {
        this.$v.$reset();
        this.id="";
        this.password = "";
        }
    },
    // computed: {
    // passwordErrors() {
    //         const errors = [];
    //         //if (!this.$v.password.$dirty) return errors;
    //         !this.$v.password.maxLength &&
    //         errors.push("password must be at most 20 characters long");
    //         !this.$v.password.required && errors.push("password is required.");
    //         return errors;
    //     }
    // }
};
</script>

<style>
</style>
