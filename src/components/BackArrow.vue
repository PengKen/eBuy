<template>
    <img class="back-arrow" src="/static/icon-img/icons8-back-26.png" @click="back()">
</template>

<script>
export default {
    name: "back-arrow",
    methods: {
        back() {
            this.$router.go(-1);
        }
    }
}
</script>

<style>
    .back-arrow {
        width: 0.7rem;
        height: 0.7rem;
        position: fixed;
        left:0.5rem;
        top:0.5rem;
        z-index: 100;
    }
</style>
