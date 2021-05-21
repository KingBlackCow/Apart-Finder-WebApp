<template>
        <div class="regist">
        <h1 class="underline">로그인 
        
        
        </h1>
        <div class="regist_form">
            <label for="id">아이디</label>
            <input type="text" id="id" name="id" v-model="id" />
            <label for="password">비밀번호</label>
            <input type="text" id="password" name="password" v-model="password" /><br />
            <button v- @click="submit">제출</button>
        </div>
    </div>
</template>

<script>
import http from '@/util/http-common';
//import axios from 'axios';
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
            http.post('/user/login', { userid: this.id, userpwd: this.password}).then(
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
.regist {
    padding: 10px;
}
.regist_form {
    text-align: left;
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
}
</style>
